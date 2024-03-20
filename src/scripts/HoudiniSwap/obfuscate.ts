import axios from 'axios';

const HOUDINI_SWAP_ROOT_URL = `https://api-partner.houdiniswap.com`;

async function main() {
  console.log('Obfuscating...');

  // CHECK LIST OF SUPPORTED TOKENS
  // ----------------
  // curl -X 'GET' \
  // 'https://api-partner.houdiniswap.com/tokens' \
  // -H 'accept: application/json' \
  // -H 'authorization: <HOUDINI_SWAP_AUTH_HEADER>'
  const resp1 = await axios.get(`${HOUDINI_SWAP_ROOT_URL}/tokens`, {
    headers: {
      Accept: 'application/json',
      Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
    },
  });
  console.log(resp1.data);

  // REQUEST A QUOTE FOR A SWAP
  // ----------------
  // curl -X 'GET' \
  // 'https://api-partner.houdiniswap.com/quote?amount=1&from=ETH&to=BNB&anonymous=false&fixed=false&direction=from' \
  // -H 'accept: application/json'
  const resp2 = await axios.get(`${HOUDINI_SWAP_ROOT_URL}/quote`, {
    headers: {
      Accept: 'application/json',
      Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
    },
    params: {
      amount: 1,
      from: 'MATIC',
      to: 'MATIC',
      anonynous: true,
      fixed: false,
      direction: 'from',
    },
  });
  console.log(resp2.data);

  // CREATE AN EXCHANGE ORDER
  // ----------------
  // curl -X 'POST' \
  // 'https://api-partner.houdiniswap.com/exchange' \
  // -H 'accept: application/json' \
  // -H 'Content-Type: application/json' \
  // -d '{
  // "amount": 1,
  // "from": "ETH",
  // "to": "BNB",
  // "receiverTag": "",
  // "addressTo": "0x000000000000000000000000000000000000dead",
  // "anonymous": false,
  // "fixed": false,
  // "direction": "from",
  // "ip": "0.0.0.0",
  // "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  // "timezone": "UTC"
  // }'
  const resp3 = await axios.post(
    `${HOUDINI_SWAP_ROOT_URL}/exchange`,
    {
      amount: 1,
      from: 'ETH',
      to: 'BNB',
      receiverTag: '',
      addressTo: '',
      anonymous: false,
      fixed: false,
      direction: 'from',
      ip: '0.0.0.0',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      timezone: 'UTC',
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
      },
    }
  );
  console.log(resp3.data);

  // GET THE ORDER STATUS
  // ----------------
  // curl -X 'GET' \
  // 'https://api-partner.houdiniswap.com/status?id=asdf' \
  // -H 'accept: application/json'
  const resp4 = await axios.get(`${HOUDINI_SWAP_ROOT_URL}/status`, {
    headers: {
      Accept: 'application/json',
      Authorization: process.env.HOUDINI_SWAP_AUTH_HEADER,
    },
    params: {
      id: resp3.data.orderId, // ie: the Houdini Order ID from resp3
    },
  });
  console.log(resp4.data);
}

main();
