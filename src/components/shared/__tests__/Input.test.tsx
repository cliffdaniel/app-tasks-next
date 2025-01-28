import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';
import { UseFormRegisterReturn } from 'react-hook-form';

const mockRegister: UseFormRegisterReturn = {
    name: 'email',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
};

describe('Input Component', () => {
    it('renders correctly with label and placeholder', () => {
        render(
            <Input
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                register={mockRegister}
                error={undefined}
            />
        );

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });

    it('displays error message when provided', () => {
        render(
            <Input
                id="email"
                label="Email"
                type="email"
                register={mockRegister}
                error={{ message: 'Invalid email', type: 'validate' }}
            />
        );

        expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('calls onChange handler when typing', async () => {
        render(
            <Input
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                register={mockRegister}
                error={undefined}
            />
        );

        const input = screen.getByPlaceholderText('Enter your email');
        await userEvent.type(input, 'test@example.com');
        expect(mockRegister.onChange).toHaveBeenCalled();
    });
});
