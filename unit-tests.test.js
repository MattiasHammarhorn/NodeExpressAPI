import { describe, test, it, expect } from 'vitest';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './userService';

describe('userService tests', () => {
    test('getAllUsers returns an array', async () => {
        const users = await getAllUsers();
        expect(Array.isArray(users)).toBe(true);
    });

    test('getUserById returns defined User', async () => {
        const user = await getUserById(1);
        expect(user.id).toBe(1);
    });

    test('getUserById returns undefined with unexisting id', async () => {
        const user = await getUserById(-999);
        expect(user).toBe(undefined);
    });

    test('createUser creates a user with defined id', async () => {
        const user = await createUser('firstName','lastName');
        expect(user.id).toBeDefined();
    });

    test('updateUser', async () => {
        const createdUser = await createUser('firstName','lastName');
        const result = await updateUser(createdUser.id, 'updatedFirstName', 'updatedLastName');
        
        expect (result.updatedRows > 0);

        const updatedUser = await getUserById(createdUser.id); 
        expect(updatedUser.firstName).toBe('updatedFirstName');
        expect(updatedUser.lastName).toBe('updatedLastName');
    })

    test('deleteUser removes user', async () => {
        const user = await createUser('firstName', 'lastName');
        const deletedUser = await deleteUser(user.id);

        expect(deletedUser.deletedRows > 0);

        const userExists = await getUserById(user.id);
        expect(userExists).toBeUndefined();
    });
});