import requests

response = requests.post(
    url="http://playwright-api:8000/fetch",
    json={
        "url": "https://www.binance.com/vi/academy/articles/general-security-principles",
        "wait_until": "domcontentloaded",
        "timeout_ms": 30000,
    },
)
print(response.json())
