import { UseFormRegister, FieldValues } from 'react-hook-form';
import { FieldError } from 'react-hook-form';

type InputProps = {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    register: ReturnType<UseFormRegister<FieldValues>>;
    error?: FieldError;
};

export const Input = ({ id, label, type = 'text', placeholder, register, error }: InputProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            id={id}
            type={type}
            {...register}
            placeholder={placeholder}
            className={`block w-full px-4 py-2 mt-1 text-gray-900 border ${
                error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
);
