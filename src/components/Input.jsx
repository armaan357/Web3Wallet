export function InputBox({ type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder? placeholder : null}
            value={value}
            onChange={onChange}
            className='bg-[var(--input-bg)] w-full p-3 text-[var(--color-text)] text-base rounded-lg outline-none focus-within:shadow-md border border-[var(--input-border)] focus-within:border focus-within:border-[var(--input-focus-border)]'
            required
        />
    );
}