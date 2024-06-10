type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, ...rest }: ButtonPropsType) {
  return (
    <button
      className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200"
      type="submit"
      {...rest}
    >
      {children}
    </button>
  )
}
