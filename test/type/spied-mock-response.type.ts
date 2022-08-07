import mockReqRes from 'mock-req-res'
import Sinon from 'sinon'

export interface SpiedMockResponse {
    res: mockReqRes.ResponseOutput
    downloadSpy: Sinon.SinonSpy
    jsonSpy: Sinon.SinonSpy
}
