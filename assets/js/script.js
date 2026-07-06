// BuildFlow placeholder script
window.addEventListener('DOMContentLoaded', function() {
    console.log('BuildFlow script loaded');
    // Intercept Formspree forms and POST JSON instead of form-encoded data
    const fsForms = document.querySelectorAll('form[action*="formspree.io"]');
    fsForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            const formData = new FormData(form);
            const payload = {};
            for (const [key, value] of formData.entries()) {
                // normalize repeated keys into arrays
                if (payload.hasOwnProperty(key)) {
                    if (Array.isArray(payload[key])) payload[key].push(value);
                    else payload[key] = [payload[key], value];
                } else {
                    payload[key] = value;
                }
            }

            try {
                const res = await fetch(form.action, {
                    method: (form.method || 'POST').toUpperCase(),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    const next = form.querySelector('input[name="_next"]')?.value;
                    if (next) window.location.href = next;
                    else window.location.href = 'https://buildflow-20.netlify.app/thank-you.html';
                } else {
                    let msg = res.statusText || 'Submission failed';
                    try {
                        const data = await res.json();
                        if (data && data.error) msg = data.error;
                    } catch (_) {}
                    alert('Error: ' + msg);
                }
            } catch (err) {
                alert('Submission error: ' + err.message);
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    });
});
