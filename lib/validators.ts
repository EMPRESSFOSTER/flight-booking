import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(255, 'Email too long')
  .toLowerCase();

/**
 * Password schema for registration/setting password
 */
export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letters')
  .regex(/[a-z]/, 'Password must contain lowercase letters')
  .regex(/\d/, 'Password must contain numbers')
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password must contain special characters');

/**
 * Login request validation
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

/**
 * User registration validation
 */
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

/**
 * User profile update validation
 */
export const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(100, 'First name too long').optional(),
  lastName: z.string().min(1).max(100, 'Last name too long').optional(),
  phone: z.string().regex(/^[0-9+\-\s()]*$/, 'Invalid phone format').max(20).optional(),
});

/**
 * Flight search validation
 */
export const flightSearchSchema = z.object({
  departure: z.string().min(3, 'Invalid departure code'),
  arrival: z.string().min(3, 'Invalid arrival code'),
  departureDate: z.string().refine(date => !isNaN(Date.parse(date)), 'Invalid date'),
  returnDate: z.string().refine(date => !isNaN(Date.parse(date)), 'Invalid date').optional(),
  passengers: z.number().int().min(1).max(9, 'Max 9 passengers allowed'),
});

/**
 * Generic validator function
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
      throw new Error(`Validation failed: ${messages}`);
    }
    throw error;
  }
}

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type FlightSearchInput = z.infer<typeof flightSearchSchema>;
