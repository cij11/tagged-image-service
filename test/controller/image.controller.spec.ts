import expect from 'expect'
import { NextFunction } from 'express'
import fileUpload from 'express-fileupload'
import 'mocha'
import { mockRequest, mockResponse } from 'mock-req-res'
import sinon from 'sinon'
import { ImportMock } from 'ts-mock-imports'
import { imageController } from '../../src/controller/image.controller'
import { Image } from '../../src/entity/image.entity'
import * as imageService from '../../src/service/image.service'
import { MimeType } from '../../src/type/mime-type.type'
import { SpiedMockResponse } from '../type/spied-mock-response.type'

const next: NextFunction = (err: string) => {}

const image: Image = {
    id: 1,
    filename: 'test.jpg',
    tags: [],
    createdAt: new Date(),
    modifiedAt: new Date(),
}

function getMockReq(contentType: string) {
    const reqOptions = {
        headers: {
            'content-type': contentType,
        },
    }
    return mockRequest(reqOptions)
}

function getMockRes(): SpiedMockResponse {
    const downloadSpy = sinon.spy()
    const jsonSpy = sinon.spy()
    const resOptions = {
        download: downloadSpy,
        json: jsonSpy,
    }
    return {
        res: mockResponse(resOptions),
        downloadSpy,
        jsonSpy,
    }
}

describe('getImage', () => {
    beforeEach(function () {
        const mockImageService = {
            getImageModel: async (imageId: number): Promise<Image> => image,
            getImageFilePath: async (imageId: number): Promise<string> =>
                'test.jpg',
            createImage: async (
                file: fileUpload.UploadedFile
            ): Promise<Image> => image,
            updateImage: async (imagId: number): Promise<Image> => image,
        }

        ImportMock.mockOther(imageService, 'imageService', mockImageService)
    })

    it('downloads file when content-type header is image', async () => {
        // Given
        const req = getMockReq(MimeType.Image)
        const { res, downloadSpy, jsonSpy } = getMockRes()

        // When
        const image = await imageController.getImage(req, res, next)

        // Then
        expect(downloadSpy.called).toBe(true)
        expect(jsonSpy.called).toBe(false)
    })

    it('returns model when content-type header is application/json', async () => {
        // Given
        const req = getMockReq(MimeType.ApplicationJson)

        const { res, downloadSpy, jsonSpy } = getMockRes()

        // When
        const image = await imageController.getImage(req, res, next)

        // Then
        expect(downloadSpy.called).toBe(false)
        expect(jsonSpy.called).toBe(true)
    })
})
