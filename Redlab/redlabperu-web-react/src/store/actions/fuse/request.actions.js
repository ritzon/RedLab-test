export const FETCH_START = 'FETCH_START';
export const FETCH_END = 'FETCH_END';

export function fetch_start()
{
    return {
        type: FETCH_START
    }
}

export function fetch_end()
{
    return {
        type: FETCH_END
    }
}
