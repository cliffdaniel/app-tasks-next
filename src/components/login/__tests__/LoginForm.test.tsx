import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

describe('LoginForm Component', () => {
    it('renders correctly with inputs and button', () => {
        render(<LoginForm />);

        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    it('validates input fields', async () => {
        render(<LoginForm />);

        const submitButton = screen.getByText('Sign In');
        await userEvent.click(submitButton);

        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    it('shows error message on invalid login', async () => {
        (signIn as jest.Mock).mockResolvedValueOnce({ error: 'Invalid email or password' });

        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');
        const submitButton = screen.getByText('Sign In');

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password123');
        await userEvent.click(submitButton);

        await waitFor(() =>
            expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
        );
    });

    it('redirects to dashboard on successful login', async () => {
        const mockPush = jest.fn();
        const useRouterMock = jest.requireMock('next/navigation').useRouter;
        useRouterMock.mockReturnValue({ push: mockPush });

        (signIn as jest.Mock).mockResolvedValueOnce({ error: null });

        render(<LoginForm />);

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');
        const submitButton = screen.getByText('Sign In');

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password123');
        await userEvent.click(submitButton);

        await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/dashboard'));
    });
});
