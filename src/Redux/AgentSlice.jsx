import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    agentInfo: {},
    // userDetail:{},
}

export const agentSlice = createSlice({
    name: "agent",
    initialState: INITIAL_STATE,
    reducers: {
        setAgentDetails: (state, action) => {
            state.agentInfo = action.payload;
            console.log(action.payload,'-----------------------------------');
        },
        resetState: (state) => {
            return INITIAL_STATE;
        }

    }

})

export const { setAgentDetails, resetState } = agentSlice.actions; 

export default agentSlice.reducer;