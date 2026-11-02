const SUPABASE_URL =
    'https://euzzimaavoqmprigbxnd.supabase.co';

const SUPABASE_KEY =
    'sb_publishable_LCh3q5lUckmSqdovX7Kwng_Zazv1_DJ';

const websiteDB =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// =====================================================
// HOME PAGE
// =====================================================

const featuredVehicles =
    document.getElementById('featuredVehicles');


// =====================================================
// THE 4 FEATURED VEHICLES
// EXACTLY THE SAME AS vehicles.html
// =====================================================

const featuredCars = [

    {
        make: 'BMW',
        model: 'E90 320i iDrive Spec',
        price: 109900,
        year: 2010,
        transmission: 'Automatic',
        fuel: 'Petrol',
        mileage: 192451,

        image:
            'pictures/cars/bwm 3 series.jpeg',

        details:
            'bmw320i.html'
    },


    {
        make: 'Nissan',
        model: 'X-Trail 2.0',
        price: 0,
        year: 2013,
        transmission: 'Manual',
        fuel: 'Petrol',
        mileage: 166197,

        image:
            'pictures/cars/nissan.jpeg',

        details:
            'xtrail.html'
    },


    {
        make: 'Toyota',
        model: 'Corolla Quest 1.6 Plus',
        price: 129900,
        year: 2018,
        transmission: 'Manual',
        fuel: 'Petrol',
        mileage: 167330,

        image:
            'pictures/cars/toyota quest.jpeg',

        details:
            'toyotaquest.html'
    },


    {
        make: 'Toyota',
        model: 'Corolla Verso 1.8 7 Seater',
        price: 119900,
        year: 2007,
        transmission: 'Manual',
        fuel: 'Petrol',
        mileage: 227526,

        image:
            'pictures/cars/versomain.jpeg',

        details:
            'verso.html'
    }

];


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeVehicle(value) {

    return String(value ?? '')
        .replace(/[&<>"']/g, function (m) {

            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'

            }[m];

        });

}


// =====================================================
// PRICE
// =====================================================

function formatPrice(price) {

    if (!price || Number(price) === 0) {

        return 'PENDING!!!';

    }

    return 'R ' +
        Number(price)
            .toLocaleString('en-ZA');

}


// =====================================================
// CREATE FEATURED VEHICLE CARD
// =====================================================

function createFeaturedCard(car) {

    return `

        <div class="car-card">

            <div
                class="vehicle-image-wrap"
                style="
                    position:relative;
                    overflow:hidden;
                "
            >

                <img
                    src="${escapeVehicle(car.image)}"
                    alt="${escapeVehicle(
                        car.make +
                        ' ' +
                        car.model
                    )}"
                    onerror="
                        this.onerror=null;
                        this.src='pictures/logo.png';
                    "
                >

            </div>


            <h3>
                ${escapeVehicle(car.make)}
                ${escapeVehicle(car.model)}
            </h3>


            <p class="price">
                ${formatPrice(car.price)}
            </p>


            <p>
                ${escapeVehicle(car.year)} Model
            </p>


            <p>
                ${Number(car.mileage)
                    .toLocaleString('en-ZA')} km
            </p>


            <p>
                ${escapeVehicle(car.transmission)}
            </p>


            <a
                href="${escapeVehicle(car.details)}"
                class="details-btn"
            >
                View Details
            </a>

        </div>

    `;

}


// =====================================================
// LOAD FEATURED VEHICLES
// =====================================================

async function loadFeaturedVehicles() {

    if (!featuredVehicles) {

        console.log(
            'Featured vehicle section not found.'
        );

        return;

    }


    // Display the 4 cars immediately

    featuredVehicles.innerHTML =
        featuredCars
            .map(
                createFeaturedCard
            )
            .join('');


    try {

        const { data, error } =
            await websiteDB
                .from('vehicles')
                .select(
                    'stock_number,make,model,year,price,mileage,' +
                    'transmission,fuel,status,published,photos,' +
                    'image_url,detail_page'
                );

        if (error) {
            throw error;
        }

        const liveCars =
            (data || [])
                .filter(car => {
                    const status =
                        String(car.status || 'available')
                            .toLowerCase();

                    return car.published !== false &&
                        ![
                            'sold',
                            'removed',
                            'deleted',
                            'unavailable'
                        ].includes(status);
                })
                .sort((left, right) =>
                    String(right.stock_number || '')
                        .localeCompare(
                            String(left.stock_number || ''),
                            undefined,
                            { numeric: true }
                        )
                )
                .slice(0, 4)
                .map(car => {
                    const make = String(car.make || '').trim();
                    const model = String(car.model || '').trim();
                    const modelIncludesMake =
                        make &&
                        model.toLowerCase()
                            .startsWith(make.toLowerCase());

                    return {
                        ...car,
                        make: modelIncludesMake ? '' : make,
                        model,
                        image:
                            Array.isArray(car.photos) && car.photos.length
                                ? car.photos[0]
                                : car.image_url || 'pictures/logo.png',
                        details:
                            car.detail_page ||
                            'https://wa.me/27710270924?text=' +
                            encodeURIComponent(
                                'Hi, I am interested in the ' +
                                [make, model]
                                    .filter(Boolean)
                                    .join(' ')
                            )
                    };
                });

        if (liveCars.length) {
            featuredVehicles.innerHTML =
                liveCars
                    .map(createFeaturedCard)
                    .join('');
        }

        console.log(
            `${liveCars.length || 4} featured vehicles loaded.`
        );

    } catch (error) {

        console.error(
            'Live featured vehicles could not be loaded:',
            error
        );

    }

}


// =====================================================
// START
// =====================================================

loadFeaturedVehicles();
