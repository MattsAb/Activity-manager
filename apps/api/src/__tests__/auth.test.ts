import 'dotenv/config'
import { Request, Response } from 'express'
import { prisma } from '../config/prisma';
import { deleteUser, getMe, login, register } from '../controllers/AuthController';
import bcrypt from 'bcryptjs'

jest.mock('../config/prisma', () => ({
    prisma: {
        user: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findUnique: jest.fn()
        },
    }
}))

jest.mock('bcryptjs', () => ({
    compareSync: jest.fn(),
    hashSync: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn(),
}))

const mockRequest = {
    body: {
        username: "testname",
        email: "testEmail@gmail.com",
        password: "testpassword",
    },
    userId: '1'
}

let mockResponse: Partial<Response>

const testUser = {
    id: "1",
    username: "testname",
    email: "test@email.com",
    avatarUrl: "test",
    password: "testPassword",
}

beforeEach(() => {
    jest.clearAllMocks()
    mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
})

describe("register user", () => {

    test("should register a new user", async () => {
        (prisma.user.create as jest.Mock).mockResolvedValue(testUser);
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        await register(mockRequest as Request, mockResponse as Response)

        expect(prisma.user.create).toHaveBeenCalledTimes(1)
        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(201)
        expect(mockResponse.json).toHaveBeenCalledWith({success: true, data: expect.any(String)})

    })
    test("should reject if user already exists", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(testUser)

    await expect(register(mockRequest as Request, mockResponse as Response))
        .rejects.toThrow('User with this email already exists')

    expect(prisma.user.create).not.toHaveBeenCalled()
})
})

describe("login user", () => {

    test('should log in a user', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(testUser);
        (bcrypt.compareSync as jest.Mock).mockReturnValue(true)

        await login(mockRequest as Request, mockResponse as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({success: true,data: expect.any(String)})
    })
    test('should fail to log in a user given a wrong password', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(testUser);
        (bcrypt.compareSync as jest.Mock).mockReturnValue(false)

        await expect(login(mockRequest as Request, mockResponse as Response))
            .rejects.toThrow("Wrong password")

        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
    })
    test('should fail to log in if user does not exist', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

       
        await expect(login(mockRequest as Request, mockResponse as Response))
            .rejects.toThrow("user with this email does not exist")

        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
        expect(bcrypt.compareSync).not.toHaveBeenCalled()
    })   
       
})
describe("getMe", () => {

    test("should return the user with the given id", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(testUser);

        await getMe(mockRequest as Request, mockResponse as Response)

        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({success: true, data: testUser})
    })
    test("should return an error if user with that id does not exist", async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(getMe(mockRequest as Request, mockResponse as Response))
            .rejects.toThrow("Not found")

        expect(prisma.user.findUnique).toHaveBeenCalledTimes(1)
    })
})


describe("delete user", () => {
    test("should delete a user", async () => {
        (prisma.user.delete as jest.Mock).mockResolvedValue(testUser);

        await deleteUser(mockRequest as Request, mockResponse as Response)

        expect(prisma.user.delete).toHaveBeenCalledTimes(1)
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.json).toHaveBeenCalledWith({success: true})
    })
})