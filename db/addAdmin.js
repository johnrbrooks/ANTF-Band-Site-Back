const adminUser = {
    email: 'anighttoforgetdc@gmail.com',
    password: 'Peopleweknew',
};

const createAdminUser = async () => {
    const url = `https://antf-band-site-back-production.up.railway.app/api/admin/createAdmin`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminUser),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Request failed:', data);
            return;
        }

        if (response.ok) {
            console.log(data.message);
        }
    } catch (error) {
        console.log('There was an error: ', error);
    }
};

createAdminUser();
