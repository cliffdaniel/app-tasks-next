export type ButtonProps = {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    isLoading?: boolean;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ type = 'button', disabled, isLoading, children, onClick }: ButtonProps) => (
    <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
    >
        {isLoading ? 'Loading...' : children}
    </button>
);
