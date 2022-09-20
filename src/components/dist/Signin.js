"use strict";
exports.__esModule = true;
var react_1 = require("react");
var bs_1 = require("react-icons/bs");
var fc_1 = require("react-icons/fc");
var formik_1 = require("formik");
var Yup = require("yup");
var link_1 = require("next/link");
var di_1 = require("react-icons/di");
var Signin = function (props) {
    var signIn = props.signIn, providers = props.providers;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "md:mt-[15vh] flex flex-col items-center" },
            react_1["default"].createElement("div", { className: "form flex flex-col justify-center items-center px-8 py-12 shadow-lg mx-auto w-[25rem] " },
                react_1["default"].createElement("div", { className: "overlay w-12 h-12 border-radius bg-btnPrimary relative rounded-full" },
                    react_1["default"].createElement(bs_1.BsFillShieldLockFill, { size: 26, className: "text-white absolute top-3 left-[11px]" })),
                react_1["default"].createElement("h3", { className: "mx-4 mt-2" }, "Hey, welcome back !!!"),
                react_1["default"].createElement("button", { className: "flex justify-center items-center border border-gray-700 px-4 py-2 mb-2 mt-6 w-full", onClick: function () { return signIn(providers.google.id); } },
                    react_1["default"].createElement(fc_1.FcGoogle, { className: "mr-3" }),
                    " Continue with Google"),
                react_1["default"].createElement("button", { className: "flex justify-center items-center border border-gray-700 px-4 py-2 mb-6 mt-1 w-full", onClick: function () { return signIn(providers.github.id); } },
                    react_1["default"].createElement(di_1.DiGithubBadge, { className: "mr-3" }),
                    " Continue with GitHub"),
                react_1["default"].createElement(SigninForm, { signIn: signIn })),
            react_1["default"].createElement("div", { className: "flex wrap justify-between items-center  w-[25rem] p-2 mt-2" },
                react_1["default"].createElement("span", { className: "text-btnPrimary font-semibold" }, "Forgot Password?"),
                react_1["default"].createElement("span", { className: "text-slate-500" },
                    "Don't have an account? ",
                    react_1["default"].createElement(link_1["default"], { href: "/auth/signup" },
                        react_1["default"].createElement("span", { className: "text-btnPrimary" }, " Sign Up")))))));
};
var SigninForm = function (_a) {
    var signIn = _a.signIn;
    var formik = formik_1.useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'password length must be greater than 8').required('Required')
        }),
        onSubmit: function (values) {
            signIn("credentials", values);
        }
    });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("form", { onSubmit: formik.handleSubmit, className: "flex flex-col" },
            react_1["default"].createElement("input", { id: "email", name: "email", type: "email", onChange: formik.handleChange, onBlur: formik.handleBlur, value: formik.values.email, placeholder: "Email Address", className: formik.touched.email && formik.errors.email ? "" : "mb-4" }),
            formik.touched.email && formik.errors.email ? (react_1["default"].createElement("div", { className: "text-red-500 mt-1 mb-3" }, formik.errors.email)) : null,
            react_1["default"].createElement("input", { id: "password", name: "password", type: "password", onChange: formik.handleChange, onBlur: formik.handleBlur, value: formik.values.password, placeholder: "Password", className: formik.touched.password && formik.errors.password ? "" : "mb-7" }),
            formik.touched.password && formik.errors.password ? (react_1["default"].createElement("div", { className: "text-red-500 mt-1 mb-5" }, formik.errors.password)) : null,
            react_1["default"].createElement("button", { type: "submit", className: "submit-btn" }, "Sign In"))));
};
exports["default"] = Signin;
