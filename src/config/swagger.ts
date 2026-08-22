import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Movie Ticket Booking API",
            version: "1.0.0",
            description: "API documentation for Movie Ticket Booking System",
        },

        servers: [
            {
            url: "http://localhost:3000",
            description: "Local server"
            },
            {
            url: "https://the-api-avengers-movie-ticket-booking-api-production.up.railway.app",
            description: "Production server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },

            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "66c123456789abcdef123456",
                        },
                        fullName: {
                            type: "string",
                            example: "Nour Elhamady",
                        },
                        email: {
                            type: "string",
                            example: "nour@example.com",
                        },
                        role: {
                            type: "string",
                            enum: ["customer", "admin"],
                            example: "customer",
                        },
                    },
                },

                Register: {
                    type: "object",
                    required: ["fullName", "email", "password", "role"],
                    properties: {
                        fullName: {
                            type: "string",
                            example: "Nour Elhamady",
                        },
                        email: {
                            type: "string",
                            example: "nour@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "Password123!",
                        },
                        role: {
                            type: "string",
                            enum: ["customer", "admin"],
                            example: "customer",
                        },
                    },
                },

                Login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "nour@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "Password123!",
                        },
                    },
                },

                Movie: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "66c123456789abcdef123456",
                        },
                        title: {
                            type: "string",
                            example: "Avengers: Endgame",
                        },
                        genre: {
                            type: "string",
                            example: "Action",
                        },
                        duration: {
                            type: "number",
                            example: 181,
                        },
                        description: {
                            type: "string",
                            example: "The Avengers face their biggest challenge yet.",
                        },
                        posterUrl: {
                            type: "string",
                            example: "https://example.com/poster.jpg",
                        },
                        rating: {
                            type: "number",
                            minimum: 0,
                            maximum: 10,
                            example: 8.5,
                        },
                        status: {
                            type: "string",
                            enum: ["Now Showing", "Coming Soon"],
                            example: "Now Showing",
                        },
                    },
                },

                CreateMovie: {
                    type: "object",
                    required: [
                        "title",
                        "genre",
                        "duration",
                        "description",
                        "posterUrl",
                        "rating",
                        "status",
                    ],
                    properties: {
                        title: {
                            type: "string",
                            example: "Avengers: Endgame",
                        },
                        genre: {
                            type: "string",
                            example: "Action",
                        },
                        duration: {
                            type: "number",
                            example: 181,
                        },
                        description: {
                            type: "string",
                            example: "The Avengers face their biggest challenge yet.",
                        },
                        posterUrl: {
                            type: "string",
                            example: "https://example.com/poster.jpg",
                        },
                        rating: {
                            type: "number",
                            minimum: 0,
                            maximum: 10,
                            example: 8.5,
                        },
                        status: {
                            type: "string",
                            enum: ["Now Showing", "Coming Soon"],
                            example: "Now Showing",
                        },
                    },
                },

                Showtime: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "66c123456789abcdef123456",
                        },
                        movie: {
                            type: "string",
                            example: "66c123456789abcdef654321",
                        },
                        hallNo: {
                            type: "number",
                            example: 3,
                        },
                        date: {
                            type: "string",
                            format: "date",
                            example: "2026-09-01",
                        },
                        startTime: {
                            type: "string",
                            example: "18:00",
                        },
                        endTime: {
                            type: "string",
                            example: "21:00",
                        },
                        ticketPrice: {
                            type: "number",
                            example: 150,
                        },
                        totalCapacity: {
                            type: "number",
                            example: 100,
                        },
                        bookedSeats: {
                            type: "array",
                            items:
                                {
                                    type: "string",
                                },
                            example: ["A1", "A2", "B4"],
                        },
                    },
                },

                CreateShowtime: {
                    type: "object",
                    required: [
                        "movie",
                        "hallNo",
                        "date",
                        "startTime",
                        "endTime",
                        "ticketPrice",
                        "totalCapacity",
                    ],
                    properties: {
                        movie: {
                            type: "string",
                            example: "66c123456789abcdef654321",
                        },
                        hallNo: {
                            type: "number",
                            example: 3,
                        },
                        date: {
                            type: "string",
                            format: "date",
                            example: "2026-09-01",
                        },
                        startTime: {
                            type: "string",
                            example: "18:00",
                        },
                        endTime: {
                            type: "string",
                            example: "21:00",
                        },
                        ticketPrice: {
                            type: "number",
                            example: 150,
                        },
                        totalCapacity: {
                            type: "number",
                            example: 100,
                        },
                    },
                },

                Booking: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "66c123456789abcdef987654",
                        },
                        customer: {
                            type: "string",
                            example: "66c123456789abcdef123456",
                        },
                        showtime: {
                            type: "string",
                            example: "66c123456789abcdef654321",
                        },
                        selectedSeats: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            example: ["A1", "A2"],
                        },
                        totalPrice: {
                            type: "number",
                            example: 300,
                        },
                        bookingStatus: {
                            type: "string",
                            enum: ["Pending", "Confirmed", "Cancelled"],
                            example: "Pending",
                        },
                    },
                },

                CreateBooking: {
                    type: "object",
                    required: ["showtime", "selectedSeats"],
                    properties: {
                        showtime: {
                            type: "string",
                            example: "66c123456789abcdef654321",
                        },
                        selectedSeats: {
                            type: "array",
                            minItems: 1,
                            items: {
                                type: "string",
                            },
                            example: ["A1", "A2"],
                        },
                    },
                },
            },
        },
    },

    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);