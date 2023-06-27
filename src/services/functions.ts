const crypto = require('crypto');

export function generateUniqueHash() {
    const currentTimestamp = new Date().getTime().toString();
    const randomValue = Math.random().toString();
  
    const hash = crypto.createHash('sha256');
    hash.update(currentTimestamp + randomValue);
  
    const hashBuffer = hash.digest();
    const base64Hash = hashBuffer.toString('base64');
  
    // Removendo caracteres especiais e deixando apenas letras, números e alguns símbolos
    const simplifiedHash = base64Hash.replace(/[/+=]/g, '').slice(0, 10);
  
    return simplifiedHash;
  }