import ErrorHandler from "../error/error.js";
import { Reservation } from "../model/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  const { firstname, lastname, email, phone_number, date, time } = req.body;

  if (!firstname || !lastname || !email || !phone_number || !date || !time) {
    return next(new ErrorHandler("Fill the complete form", 400));
  }

  try {
    await Reservation.create({
      firstname,
      lastname,
      email,
      phone_number,
      date,
      time,
    });
    

    res.status(200).json({
      success: true,
      message: "Reservation sent Successfully",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map(
        (e) => e.message,
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    // Handle other errors
    return next(err);
  }
};

export default sendReservation;
