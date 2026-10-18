import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/useSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff, CheckCircle2, CircleAlert, X } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const DEFAULT_PHOTO_URL =
  "https://static.vecteezy.com/system/resources/thumbnails/083/528/736/small/minimalist-avatar-icon-showing-human-head-and-shoulders-shape-as-a-simple-person-profile-vector.jpg";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const passwordsDoNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
    setError("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const getErrorMessage = (err, fallback) => {
    const responseData = err?.response?.data;

    if (typeof responseData === "string") {
      return responseData;
    }

    return responseData?.message || fallback;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: emailId.trim(),
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to log in. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (isSubmitting) return;

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please check your password.");
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }

    if (!emailId.trim()) {
      setError("Email address is required.");
      return;
    }

    const numericAge = Number(age);

    if (
      !age ||
      !Number.isInteger(numericAge) ||
      numericAge < 18 ||
      numericAge > 120
    ) {
      setError("Please enter a valid age between 18 and 120.");
      return;
    }

    if (!gender) {
      setError("Please select your gender.");
      return;
    }

    const signUpData = {
      emailId: emailId.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      photoUrl: photoUrl.trim() || DEFAULT_PHOTO_URL,
      age: numericAge,
      gender,
      about: about.trim() || "No information provided",
      skills: skills.length > 0 ? skills : ["No skills provided"],
    };

    setIsSubmitting(true);

    try {
      await axios.post(`${BASE_URL}/signup`, signUpData);

      toast.success("Account created successfully! Please log in.");

      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);

      setTimeout(() => {
        setIsSignUp(false);
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Unable to create your account. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSkill = () => {
    const trimmedSkill = newSkill.trim();

    if (!trimmedSkill) return;

    const alreadyExists = skills.some(
      (skill) => skill.toLowerCase() === trimmedSkill.toLowerCase(),
    );

    if (alreadyExists) {
      setError("This skill has already been added.");
      return;
    }

    setSkills((prev) => [...prev, trimmedSkill]);
    setNewSkill("");
    setError("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = isSignUp ? handleSignUp : handleLogin;

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 bg-base-200">
      <div className="card w-full max-w-md border border-cyan-200 bg-base-100 rounded-2xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold tracking-tight">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>

            <p className="text-sm text-base-content/60 mt-2">
              {isSignUp
                ? "Create your account to get started."
                : "Enter your credentials to continue."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            {/* Email */}
            <label className="form-control w-full py-2">
              <span className="label-text font-medium mb-2">Email Address</span>

              <input
                type="email"
                value={emailId}
                placeholder="you@example.com"
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setError("");
                }}
                className="input input-bordered w-full rounded-xl focus:outline-none focus:border-primary"
                autoComplete="email"
                required
              />
            </label>

            {/* Password */}
            <label className="form-control w-full py-2">
              <span className="label-text font-medium mb-2">Password</span>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="input input-bordered w-full pr-12 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  minLength={isSignUp ? 8 : undefined}
                  required
                  aria-label="Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-base-content/60 hover:text-primary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {isSignUp && (
                <span className="text-xs text-base-content/60 mt-2">
                  Use at least 8 characters.
                </span>
              )}
            </label>

            {/* Confirm Password */}
            {isSignUp && (
              <label className="form-control w-full py-2">
                <span className="label-text font-medium mb-2">
                  Confirm Password
                </span>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="Re-enter your password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    className={`input input-bordered w-full pr-12 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                      confirmPassword.length === 0
                        ? "focus:border-primary focus:ring-primary/20"
                        : passwordsMatch
                          ? "border-success focus:border-success focus:ring-success/20"
                          : "border-error focus:border-error focus:ring-error/20"
                    }`}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    aria-label="Confirm password"
                    aria-invalid={passwordsDoNotMatch}
                    aria-describedby="confirm-password-feedback"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-base-content/60 hover:text-primary transition-colors"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {/* Live validation feedback */}
                <div
                  id="confirm-password-feedback"
                  aria-live="polite"
                  className="mt-2 min-h-5"
                >
                  {confirmPassword.length > 0 &&
                    (passwordsMatch ? (
                      <span className="flex items-center gap-1.5 text-success text-sm">
                        <CheckCircle2 size={16} />
                        Passwords match
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-error text-sm">
                        <CircleAlert size={16} />
                        Passwords do not match
                      </span>
                    ))}
                </div>
              </label>
            )}

            {/* Signup-only fields */}
            {isSignUp && (
              <>
                <label className="form-control w-full py-2">
                  <span className="label-text font-medium mb-2">
                    First Name
                  </span>

                  <input
                    type="text"
                    value={firstName}
                    placeholder="Enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full rounded-xl"
                    autoComplete="given-name"
                    required
                  />
                </label>

                <label className="form-control w-full py-2">
                  <span className="label-text font-medium mb-2">Last Name</span>

                  <input
                    type="text"
                    value={lastName}
                    placeholder="Enter your last name"
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full rounded-xl"
                    autoComplete="family-name"
                    required
                  />
                </label>

                <label className="form-control w-full py-2">
                  <span className="label-text font-medium mb-2">
                    Profile Image URL (Optional)
                  </span>

                  <input
                    type="url"
                    value={photoUrl}
                    placeholder="https://example.com/profile.jpg"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input input-bordered w-full rounded-xl"
                  />
                </label>

                <label className="form-control w-full py-2">
                  <span className="label-text font-medium mb-2">Age</span>

                  <input
                    type="number"
                    value={age}
                    placeholder="Enter your age"
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full rounded-xl"
                    min="18"
                    max="120"
                    required
                  />
                </label>

                <label className="form-control w-full py-2">
                  <span className="label-text font-medium mb-2">Gender</span>

                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full rounded-xl"
                    required
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="form-control w-full py-2">
                  <span className="label-text font-medium mb-2">
                    About (Optional)
                  </span>

                  <textarea
                    value={about}
                    placeholder="Tell us something about yourself"
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea textarea-bordered w-full rounded-xl"
                    rows={3}
                  />
                </label>

                {/* Skills */}
                <div className="form-control w-full py-2">
                  <span className="label-text font-medium mb-2">Skills</span>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-base-200 rounded-full"
                      >
                        {skill}

                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-error hover:text-error/70"
                          aria-label={`Remove ${skill}`}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      placeholder="Add a skill"
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      className="input input-bordered w-full min-w-0 rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={addSkill}
                      className="btn btn-outline btn-primary rounded-xl"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 text-error bg-error/10 border border-error/20 rounded-xl p-3 mt-3 text-sm"
              >
                <CircleAlert size={18} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={
                isSubmitting ||
                (isSignUp &&
                  (password.length < 8 ||
                    confirmPassword.length === 0 ||
                    password !== confirmPassword))
              }
              className="btn btn-primary w-full rounded-xl mt-5 transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  {isSignUp ? "Creating account..." : "Logging in..."}
                </>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Switch between Login and Signup */}
          <div className="text-center mt-5 text-sm">
            <span className="text-base-content/70">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
            </span>

            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-primary font-semibold hover:underline"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Login;
