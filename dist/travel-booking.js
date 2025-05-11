




"use strict";
// 1. Define types and enums
var TravelType;
(function (TravelType) {
    TravelType["Flight"] = "Flight";
    TravelType["Train"] = "Train";
    TravelType["Bus"] = "Bus";
})(TravelType || (TravelType = {}));
// Store all bookings
let bookings = [];
let nextId = 1;
function bookTicket(name, route, seatType) {
    // 5. Never return type for invalid route
    if (route[0] === route[1]) {
        throwInvalidRouteError(route);
    }
    const newBooking = {
        id: nextId++,
        name,
        route,
        travelType: TravelType.Flight, // Default to Flight
        status: "booked",
        mealPreference: seatType ? undefined : "Vegetarian" // Default meal if no seatType
    };
    if (seatType) {
        newBooking.mealPreference = seatType;
    }
    bookings.push(newBooking);
    console.log(`Booking created: ${name} - ${route[0]} to ${route[1]}`);
    return newBooking;
}
// 5. Function with never return type for invalid route
function throwInvalidRouteError(route) {
    throw new Error(`Invalid route: ${route[0]} and ${route[1]} cannot be the same`);
}
// 3. Display bookings using rest parameters
function displayBookings(...bookingIds) {
    if (bookingIds.length === 0) {
        console.log("Displaying all bookings:");
        bookings.forEach(booking => printBooking(booking));
    }
    else {
        console.log(`Displaying bookings with IDs: ${bookingIds.join(', ')}`);
        bookingIds.forEach(id => {
            const booking = bookings.find(b => b.id === id);
            if (booking) {
                printBooking(booking);
            }
            else {
                console.log(`Booking with ID ${id} not found`);
            }
        });
    }
}
// 6. Print summary (void return type)
function printSummary() {
    console.log("\n=== Booking Summary ===");
    console.log(`Total bookings: ${bookings.length}`);
    const statusCounts = {
        booked: 0,
        cancelled: 0,
        pending: 0
    };
    bookings.forEach(booking => {
        statusCounts[booking.status]++;
    });
    console.log(`Booked: ${statusCounts.booked}, Cancelled: ${statusCounts.cancelled}, Pending: ${statusCounts.pending}`);
}
// 7. Cancel booking with type assertion
function cancelBooking(bookingRef) {
    const id = typeof bookingRef === 'number' ? bookingRef : bookingRef.id;
    const booking = bookings.find(b => b.id === id);
    if (booking) {
        booking.status = "cancelled";
        console.log(`Booking ${id} cancelled`);
    }
    else {
        console.log(`Booking ${id} not found`);
    }
}
// 8. Callback function to get bookings by status
function getBookingsByStatus(status, callback) {
    const result = bookings.filter(booking => booking.status === status);
    callback(result);
}
// Helper function to print a booking
function printBooking(booking) {
    console.log(`ID: ${booking.id}, Name: ${booking.name}, ` +
        `Route: ${booking.route[0]} → ${booking.route[1]}, ` +
        `Type: ${booking.travelType}, Status: ${booking.status}, ` +
        `Meal: ${booking.mealPreference || "Not specified"}`);
}
// Test the implementation
console.log("=== Travel Booking System ===");
// Create some bookings
try {
    const booking1 = bookTicket("John Doe", ["New York", "London"]);
    const booking2 = bookTicket("Jane Smith", ["Paris", "Berlin"], "Business");
    const booking3 = bookTicket("Bob Johnson", ["Tokyo", "Sydney"]);
    // This will throw an error (never return type)
    // const invalidBooking = bookTicket("Error Test", ["Mumbai", "Mumbai"]);
}
catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    }
    else {
        console.error("An unknown error occurred");
    }
}
// Display bookings
displayBookings(1, 2);
displayBookings(); // All bookings
// Print summary
printSummary();
// Cancel a booking
cancelBooking(1);
// Get bookings by status with callback
getBookingsByStatus("booked", (bookedBookings) => {
    console.log("\nBooked bookings (via callback):");
    bookedBookings.forEach(printBooking);
});
// Update summary after cancellation
printSummary();
