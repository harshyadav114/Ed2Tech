export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 lg:px-5 sm:px-3 px-2  font-semibold text-richblack-900 text-clamphead ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }