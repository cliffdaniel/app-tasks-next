import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from '../Form';

describe('Form Component', () => {
    it('calls onSubmit when the form is submitted', () => {
        const handleSubmit = jest.fn();
        render(
            <Form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </Form>
        );

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(handleSubmit).toHaveBeenCalled();
    });
});
