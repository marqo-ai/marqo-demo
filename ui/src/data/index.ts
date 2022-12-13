import { CoreRequest, CoreResponse } from "../api/types";
import boredapesResponse from "./boredapesResponse.json";
import simplewikiResponse from "./simplewikiResponse.json";

// mock request response
export const mockCoreApiBoredApesResults: CoreResponse = boredapesResponse;
export const mockCoreApiSimpleWikiResults: CoreResponse = simplewikiResponse;

// Mock request data
export const MOCK_CORE_REQUEST_BOREDAPES_DATA: CoreRequest = {
    q: "Space hippo",
    index: "boredapes"
}
export const MOCK_CORE_REQUEST_SIMPLEWIKI_DATA: CoreRequest = {
    q: "Space hippo",
    index: "simplewiki"
}