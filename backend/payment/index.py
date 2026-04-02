"""
Создание платежа через ЮKassa и проверка статуса.
action=create → создать платёж
action=status → проверить статус
"""
import json
import os
import uuid
import base64
import urllib.request
import urllib.error


CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
}

METHOD_MAP = {
    'card': 'bank_card',
    'sbp': 'sbp',
    'yoomoney': 'yoo_money',
    'skins': 'bank_card',
    'btc': 'bank_card',
}


def yk_auth() -> str:
    shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
    secret = os.environ.get('YOOKASSA_SECRET_KEY', '')
    return base64.b64encode(f'{shop_id}:{secret}'.encode()).decode()


def ok(data: dict) -> dict:
    return {'statusCode': 200, 'headers': CORS, 'body': data}


def err(code: int, msg: str) -> dict:
    return {'statusCode': code, 'headers': CORS, 'body': {'error': msg}}


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    raw = event.get('body') or '{}'
    if isinstance(raw, str):
        body = json.loads(raw)
        if isinstance(body, str):
            body = json.loads(body)
    else:
        body = raw or {}

    action = body.get('action', 'create')

    # === CREATE ===
    if action == 'create':
        amount = float(body.get('amount', 0))
        method = body.get('method', 'card')
        return_url = body.get('returnUrl', 'https://yydrop.battle')

        if amount < 50:
            return err(400, 'Минимальная сумма 50 руб')

        if not os.environ.get('YOOKASSA_SECRET_KEY'):
            return err(503, 'Платежный шлюз не настроен')

        headers = {
            'Authorization': f'Basic {yk_auth()}',
            'Content-Type': 'application/json',
            'Idempotence-Key': str(uuid.uuid4()),
        }
        data = {
            'amount': {'value': f'{amount:.2f}', 'currency': 'RUB'},
            'payment_method_data': {'type': METHOD_MAP.get(method, 'bank_card')},
            'confirmation': {'type': 'redirect', 'return_url': return_url},
            'capture': True,
            'description': f'YYDROP.BATTLE пополнение {amount:.0f} руб',
        }

        req = urllib.request.Request(
            'https://api.yookassa.ru/v3/payments',
            data=json.dumps(data).encode(),
            headers=headers,
            method='POST',
        )
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                result = json.loads(resp.read().decode())
                return ok({
                    'paymentId': result.get('id'),
                    'confirmUrl': result.get('confirmation', {}).get('confirmation_url', ''),
                    'status': result.get('status'),
                    'amount': amount,
                })
        except urllib.error.HTTPError as e:
            return err(e.code, e.read().decode())

    # === STATUS ===
    if action == 'status':
        pid = body.get('paymentId', '')
        if not pid:
            return err(400, 'paymentId required')

        headers = {
            'Authorization': f'Basic {yk_auth()}',
            'Idempotence-Key': str(uuid.uuid4()),
        }
        req = urllib.request.Request(
            f'https://api.yookassa.ru/v3/payments/{pid}',
            headers=headers,
            method='GET',
        )
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                result = json.loads(resp.read().decode())
                return ok({
                    'status': result.get('status'),
                    'paid': result.get('paid', False),
                    'amount': float(result.get('amount', {}).get('value', 0)),
                })
        except Exception as e:
            return err(500, str(e))

    return err(400, 'Unknown action')