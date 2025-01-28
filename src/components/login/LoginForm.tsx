'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { Form } from '../shared/Form';
import { useState } from 'react';

const loginSchema = z.object({
    email: z
        .string()
        .nonempty('Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .nonempty('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { pending: formPending } = useFormStatus();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setError(null);
        startTransition(async () => {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/dashboard');
            }
        });
    };

    const isLoading = isPending || formPending || isSubmitting;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <Input
                id="email"
                label="Email:"
                type="email"
                placeholder="john.doe@example.com"
                register={register('email')}
                error={errors.email}
            />
            <Input
                id="password"
                label="Password:"
                type="password"
                placeholder="********"
                register={register('password')}
                error={errors.password}
            />
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
                Sign In
            </Button>
        </Form>
    );
};
