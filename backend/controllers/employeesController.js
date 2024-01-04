const employees = require("../models/employeesSchema");

const ITEM_PER_PAGE = 2;

const handleSuccess = (res, data) => {
  res.status(200).json({ success: true, data });
};

const handleValidationError = (res, message) => {
  res.status(400).json({ success: false, error: message });
};

const handleNotFound = (res, message) => {
  res.status(404).json({ success: false, error: message });
};

const handleServerError = (res, message = "Internal server error") => {
  res.status(500).json({ success: false, error: message });
};

const getEmployeesTable = async (req, res) => {
  try {
    const {
      search = "",
      gender = "",
      status = "",
      sort = "",
      page = 1,
    } = req.query;

    const query = {
      $or: [
        { fname: { $regex: search, $options: "i" } },
        { lname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ],
    };

    if (gender !== "all") {
      query.gender = gender;
    }

    if (status !== "all") {
      query.status = status;
    }

    const skip = (page - 1) * ITEM_PER_PAGE;
    const count = await employees.countDocuments(query);
    const employeesTableData = await employees
      .find(query)
      .sort({ datecreated: sort === "new" ? -1 : 1 })
      .limit(ITEM_PER_PAGE)
      .skip(skip);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);

    handleSuccess(res, {
      pagination: {
        count,
        pageCount,
      },
      employeesTableData,
    });
  } catch (error) {
    handleServerError(res);
  }
};

const addNewEmployee = async (req, res) => {
  try {
    const { fname, lname, email, mobile, gender, location, status } = req.body;

    // Add validation for required fields
    if (
      !fname ||
      !lname ||
      !email ||
      !mobile ||
      !gender ||
      !location ||
      !status
    ) {
      handleValidationError(res, "All inputs are required");
      return;
    }

    const preuser = await employees.findOne({ email });

    if (preuser) {
      handleValidationError(res, "This user already exists in our database");
    } else {
      const datecreated = new Date();
      const employeeData = new employees({
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        datecreated,
      });

      await employeeData.save();
      handleSuccess(res, employeeData);
    }
  } catch (error) {
    handleServerError(res);
  }
};

const getSingleEmployeeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeData = await employees.findOne({ _id: id });

    if (employeeData) {
      handleSuccess(res, employeeData);
    } else {
      handleNotFound(res, "User not found");
    }
  } catch (error) {
    handleServerError(res);
  }
};

const updateEmployeeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, lname, email, mobile, gender, location, status } = req.body;

    const dateUpdated = new Date();

    const updateEmployee = await employees.findByIdAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        mobile,
        gender,
        location,
        status,
        dateUpdated,
      },
      {
        new: true,
      }
    );

    if (updateEmployee) {
      handleSuccess(res, updateEmployee);
    } else {
      handleNotFound(res, "User not found");
    }
  } catch (error) {
    handleServerError(res);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await employees.findByIdAndDelete({ _id: id });

    if (deleteEmployee) {
      handleSuccess(res, deleteEmployee);
    } else {
      handleNotFound(res, "User not found");
    }
  } catch (error) {
    handleServerError(res);
  }
};

module.exports = {
  getEmployeesTable,
  addNewEmployee,
  getSingleEmployeeDetails,
  updateEmployeeDetails,
  deleteEmployee,
};
