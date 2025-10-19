export const getStatusService = async (name: string) => {
    try {
        const response = await fetch(`http://localhost:3000/ms/getStatus/${name}`);
        const status = await response.json()
        if (!response.ok) {
            return null
        } else {
            return status.status
        }
    } catch (error) {
        console.error('Error: ', error)
    }
}