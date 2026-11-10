// =========================================
// Gnerdywonder Checkout — Paystack InlineJS
// =========================================

// Paystack configuration (TEST MODE — switch to live key for production)
const PAYSTACK_PUBLIC_KEY = 'pk_test_9bea51e2bf65da4ca28f1128cb485f7f554c150b';

// Plan configuration (GHS — amounts in pesewas: 1 GHS = 100 pesewas)
const PLANS = {
    basic: {
        name: 'Basic',
        price: 100000,
        priceDisplay: '1,000.00',
        devices: '1 device',
        updates: '1 year updates',
        support: 'Standard support',
        filename: 'GnerdyWonderSetup.exe'
    },
    advanced: {
        name: 'Advanced',
        price: 150000,
        priceDisplay: '1,500.00',
        devices: '3 devices',
        updates: '1 year updates',
        support: 'Priority support',
        filename: 'GnerdyWonderSetup.exe'
    },
    perpetual: {
        name: 'Perpetual',
        price: 250000,
        priceDisplay: '2,500.00',
        devices: '5 devices',
        updates: 'Lifetime updates',
        support: 'Lifetime support',
        filename: 'GnerdyWonderSetup.exe'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const planKey = urlParams.get('plan');

    if (!planKey || !PLANS[planKey]) {
        showError('Invalid plan selected. Please go back and choose a plan.');
        return;
    }

    const plan = PLANS[planKey];

    // Populate plan summary
    document.getElementById('planName').textContent = plan.name;
    document.getElementById('planPrice').textContent = 'GH₵ ' + plan.priceDisplay;
    document.getElementById('planDevices').textContent = plan.devices;
    document.getElementById('planUpdates').textContent = plan.updates;
    document.getElementById('planSupport').textContent = plan.support;

    // Setup form elements
    const form = document.getElementById('checkoutForm');
    const emailInput = document.getElementById('email');
    const payBtn = document.getElementById('payBtn');
    const payBtnText = document.getElementById('payBtnText');
    const paySpinner = document.getElementById('paySpinner');
    const errorMsg = document.getElementById('errorMsg');

    // Form submission — initialize Paystack with a valid email at transaction time
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        if (!email) {
            showError('Please enter your email address.');
            emailInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        // Generate reference
        const ref = 'GNERDY_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        setLoading(true);
        hideError();

        // Initialize Paystack with the validated email and reference
        const handler = PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: email,
            amount: plan.price,
            currency: 'GHS',
            ref: ref,
            metadata: {
                plan: planKey,
                product: 'Gnerdywonder Software',
                devices: plan.devices,
                custom_fields: [
                    {
                        display_name: 'Plan',
                        variable_name: 'plan',
                        value: plan.name
                    },
                    {
                        display_name: 'Price (GHS)',
                        variable_name: 'price',
                        value: plan.priceDisplay
                    }
                ]
            },
            callback: function(response) {
                const reference = response.reference;
                window.location.href = 'success.html?reference=' + encodeURIComponent(reference) + '&plan=' + planKey;
            },
            onClose: function() {
                resetButton();
                window.location.href = 'cancel.html?plan=' + planKey;
            }
        });

        handler.openIframe();
    });

    function setLoading(loading) {
        if (loading) {
            payBtn.disabled = true;
            payBtn.classList.add('loading');
            payBtnText.textContent = 'Processing Payment...';
            paySpinner.style.display = 'inline-block';
        } else {
            payBtn.disabled = false;
            payBtn.classList.remove('loading');
            payBtnText.textContent = 'Pay with Paystack';
            paySpinner.style.display = 'none';
        }
    }

    function resetButton() {
        setLoading(false);
    }

    function showError(msg) {
        const el = document.getElementById('errorMsg');
        el.textContent = msg;
        el.style.display = 'block';
    }

    function hideError() {
        const el = document.getElementById('errorMsg');
        el.style.display = 'none';
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});