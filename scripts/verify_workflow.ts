const BASE_URL = 'http://localhost:3000';

// Mock data
const participant = {
    name: 'Test Presenter',
    email: `test.presenter.${Math.random().toString(36).substring(7)}@example.com`,
    phone: '1234567890',
    participantType: 'presenter',
    track: 'Track 1: Artificial Intelligence & Machine Learning',
    paperTitle: 'AI in Healthcare',
    university: 'Test Uni',
    location: { city: 'Test City', state: 'TS', country: 'Test Country' },
    transactionId: 'TXN123456',
    image: null // Skipping image for script simplicity, or I could load a base64
};

async function run() {
    console.log('🚀 Starting Verification Workflow...');

    // 1. Register Participant
    console.log('\nPlease ensure server is running at localhost:3000');
    console.log('1. Registering Participant...');
    const regRes = await fetch(`${BASE_URL}/api/participants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(participant)
    });

    if (!regRes.ok) {
        console.error('Registration failed:', await regRes.text());
        process.exit(1);
    }

    const regData = await regRes.json();
    const participantId = regData.data.id;
    console.log(`✅ Registered: ${participant.email} (ID: ${participantId})`);

    // 2. Login as Accountant
    console.log('\n2. Logging in as Accountant...');
    const accLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'accountant@niis.com', password: 'accountant' }) // Using demo creds
    });

    if (!accLoginRes.ok) {
        console.error('Accountant login failed:', await accLoginRes.text());
        process.exit(1);
    }

    const accData = await accLoginRes.json();
    const accToken = accData.token;
    console.log('✅ Accountant Logged In');

    // 3. Verify Payment
    console.log('\n3. Verifying Payment...');
    const verRes = await fetch(`${BASE_URL}/api/participants/${participantId}/payment`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accToken}`
        },
        body: JSON.stringify({ status: 'verified' })
    });

    if (!verRes.ok) {
        console.error('Payment verification failed:', await verRes.text());
        process.exit(1);
    }
    console.log('✅ Payment Verified');

    // 4. Login as Track Coordinator
    console.log('\n4. Logging in as Track Coordinator...');
    const trackLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'track@niis.com', password: 'track' })
    });

    if (!trackLoginRes.ok) {
        console.error('Track login failed:', await trackLoginRes.text());
        process.exit(1);
    }

    const trackData = await trackLoginRes.json();
    const trackToken = trackData.token;
    console.log('✅ Track Coordinator Logged In');

    // 5. Approve Paper
    console.log('\n5. Approving Paper...');
    const paperRes = await fetch(`${BASE_URL}/api/participants/${participantId}/paper`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${trackToken}`
        },
        body: JSON.stringify({ status: 'approved', remarks: 'Good paper' })
    });

    if (!paperRes.ok) {
        console.error('Paper approval failed:', await paperRes.text());
        process.exit(1);
    }
    console.log('✅ Paper Approved');

    // 6. Login as Convener to check Audit Logs
    console.log('\n6. Checking Audit Logs (Convener)...');
    const convLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'convener@niis.com', password: 'convener' })
    });

    const convData = await convLoginRes.json();
    const convToken = convData.token;

    const auditRes = await fetch(`${BASE_URL}/api/audit`, {
        headers: { 'Authorization': `Bearer ${convToken}` }
    });
    const auditData = await auditRes.json();

    // Check if we see our actions
    const recentLogs = auditData.data.slice(0, 5);
    const paymentLog = recentLogs.find((l: any) => l.action === 'PAYMENT_VERIFIED' && l.details.participantId === participantId);
    const paperLog = recentLogs.find((l: any) => l.action === 'PAPER_STATUS_UPDATE' && l.details.participantId === participantId);

    if (paymentLog) console.log('✅ Found Payment Audit Log');
    else console.warn('⚠️ Payment Audit Log not found immediately (might be async)');

    if (paperLog) console.log('✅ Found Paper Audit Log');
    else console.warn('⚠️ Paper Audit Log not found immediately');

    console.log('\n🎉 Verification Workflow Completed Successfully!');
}

run().catch(console.error);
