const SUPABASE_URL =
    'https://euzzimaavoqmprigbxnd.supabase.co';

const SUPABASE_KEY =
    'sb_publishable_LCh3q5lUckmSqdovX7Kwng_Zazv1_DJ';

const websiteDB =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

const vehicleList =
    document.getElementById('vehicle-list');


function escapeVehicle(value) {

    return String(value ?? '')
        .replace(/[&<>"']/g, m => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m]));

}


function vehicleImage(vehicle) {

    if (
        vehicle.photos &&
        Array.isArray(vehicle.photos) &&
        vehicle.photos.length
    ) {
        return vehicle.photos[0];
    }

    return 'pictures/logo.png';

}


function vehiclePrice(vehicle) {

    if (
        !vehicle.price ||
        Number(vehicle.price) === 0
    ) {
        return 'PENDING!!!';
    }

    return 'R ' +
        Number(vehicle.price)
            .toLocaleString('en-ZA');

}


function vehicleDetailsLink(vehicle) {

    /*
       If the vehicle has a detail page stored in
       Supabase, use it.

       Otherwise use vehicle.html?id=VEHICLE_ID
       so the exact database vehicle can be opened.
    */

    if (vehicle.detail_page) {
        return vehicle.detail_page;
    }

    return 'vehicle.html?id=' +
        encodeURIComponent(vehicle.id);

}


async function loadWebsiteVehicles() {

    if (!vehicleList) {
        return;
    }


    vehicleList.innerHTML = `
        <div class="car-card">
            <h3>Loading vehicles...</h3>
            <p>Please wait.</p>
        </div>
    `;


    const {
        data,
        error
    } = await websiteDB
        .from('vehicles')
        .select('*')
        .eq('published', true)
        .order(
            'created_at',
            { ascending: false }
        );


    if (error) {

        console.error(
            'Vehicle loading error:',
            error
        );

        vehicleList.innerHTML = `
            <div class="car-card">
                <h3>Unable to load vehicles</h3>
                <p>Please refresh the page.</p>
            </div>
        `;

        return;
    }


    const now = Date.now();

    const twentyFourHours =
        24 * 60 * 60 * 1000;


    const visibleVehicles =
        (data || []).filter(vehicle => {

            /*
                AVAILABLE
                ----------------
                Always show.
            */

            if (
                vehicle.status === 'available'
            ) {
                return true;
            }


            /*
                RESERVED
                ----------------
                Show on website.
            */

            if (
                vehicle.status === 'reserved'
            ) {
                return true;
            }


            /*
                SOLD
                ----------------
                Show as SOLD for 24 hours.
            */

            if (
                vehicle.status === 'sold'
            ) {

                if (!vehicle.updated_at) {
                    return true;
                }

                const soldTime =
                    new Date(
                        vehicle.updated_at
                    ).getTime();

                return (
                    now - soldTime
                ) < twentyFourHours;
            }


            return false;

        });


    if (!visibleVehicles.length) {

        vehicleList.innerHTML = `
            <div class="car-card">
                <h3>No vehicles currently available</h3>
                <p>Please check back soon.</p>
            </div>
        `;

        return;
    }


    vehicleList.innerHTML =
        visibleVehicles
            .map(vehicle => {

                const sold =
                    vehicle.status === 'sold';

                const reserved =
                    vehicle.status === 'reserved';


                let buttonText =
                    'View Details';


                if (sold) {
                    buttonText = 'SOLD';
                }

                if (reserved) {
                    buttonText = 'RESERVED';
                }


                const detailsLink =
                    vehicleDetailsLink(vehicle);


                return `

                    <div
                        class="car-card ${
                            sold
                                ? 'vehicle-sold'
                                : ''
                        }"
                    >

                        <div
                            class="vehicle-image-wrap"
                            style="
                                position:relative;
                            "
                        >

                            <img
                                src="${escapeVehicle(
                                    vehicleImage(vehicle)
                                )}"
                                alt="${escapeVehicle(
                                    (
                                        vehicle.make ||
                                        ''
                                    ) +
                                    ' ' +
                                    (
                                        vehicle.model ||
                                        ''
                                    )
                                )}"
                            >


                            ${
                                sold

                                ?

                                `
                                <span
                                    style="
                                        position:absolute;
                                        top:15px;
                                        left:15px;
                                        background:#c00000;
                                        color:#fff;
                                        padding:8px 14px;
                                        border-radius:20px;
                                        font-weight:800;
                                        z-index:2;
                                    "
                                >
                                    SOLD
                                </span>
                                `

                                :

                                reserved

                                ?

                                `
                                <span
                                    style="
                                        position:absolute;
                                        top:15px;
                                        left:15px;
                                        background:#ffba08;
                                        color:#000;
                                        padding:8px 14px;
                                        border-radius:20px;
                                        font-weight:800;
                                        z-index:2;
                                    "
                                >
                                    RESERVED
                                </span>
                                `

                                :

                                ''
                            }

                        </div>


                        <h3>
                            ${escapeVehicle(
                                vehicle.make || ''
                            )}
                            ${escapeVehicle(
                                vehicle.model || ''
                            )}
                        </h3>


                        <p class="price">
                            ${vehiclePrice(vehicle)}
                        </p>


                        <p>
                            ${
                                vehicle.year
                                    ? escapeVehicle(
                                        vehicle.year
                                    ) + ' Model'
                                    : ''
                            }
                        </p>


                        <p>
                            ${
                                vehicle.mileage
                                    ? Number(
                                        vehicle.mileage
                                    ).toLocaleString(
                                        'en-ZA'
                                    ) + ' km'
                                    : ''
                            }
                        </p>


                        <p>
                            ${escapeVehicle(
                                vehicle.transmission || ''
                            )}
                        </p>


                        ${
                            sold

                            ?

                            `
                            <a
                                href="#"
                                class="details-btn"
                                onclick="return false;"
                                style="
                                    background:#777;
                                    cursor:not-allowed;
                                "
                            >
                                SOLD
                            </a>
                            `

                            :

                            reserved

                            ?

                            `
                            <a
                                href="${detailsLink}"
                                class="details-btn"
                            >
                                RESERVED
                            </a>
                            `

                            :

                            `
                            <a
                                href="${detailsLink}"
                                class="details-btn"
                            >
                                View Details
                            </a>
                            `
                        }

                    </div>

                `;

            })
            .join('');

}


loadWebsiteVehicles();


/*
    Automatically refresh every minute.

    If the CRM changes a vehicle to SOLD,
    the public website will pick it up.
*/

setInterval(
    loadWebsiteVehicles,
    60000
);