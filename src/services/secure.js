const masterPassword = import.meta.env.MASTER_PASSWORD;

export function isPass() {
    return masterPassword;
}

export function encryptWalletData(walletData) {
    const salt = crypto.randomBytes(16);
    const key = crypto.scryptSync(masterPassword, salt, 32);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(JSON.stringify(walletData), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
    encryptedData: encrypted,
    salt: salt.toString('hex'),
    iv: iv.toString('hex')
    };
}

export function decryptWalletData(encryptedPackage) {
    const { encryptedData, salt, iv } = encryptedPackage;
    
    const key = crypto.scryptSync(masterPassword, Buffer.from(salt, 'hex'), 32);
    const decipher = crypto.createDecipheriv(
    'aes-256-cbc', 
    key, 
    Buffer.from(iv, 'hex')
    );
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
}

export function saveWallet(walletData) {
    const encryptedWallet = encryptWalletData(walletData, masterPassword);
    localStorage.setItem('encryptedWallet', JSON.stringify(encryptedWallet));
}

export function retrieveWallet() {
    const storedWallet = localStorage.getItem('encryptedWallet');
    if (!storedWallet) return null;

    try {
    const encryptedPackage = JSON.parse(storedWallet);
    return decryptWalletData(encryptedPackage, masterPassword);
    } catch (error) {
    console.error('Wallet decryption failed', error);
    return null;
    }
}
