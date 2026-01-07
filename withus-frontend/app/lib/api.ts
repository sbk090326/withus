export const API_BASE_URL = 'http://localhost:8080/api/v1';

export const api = {
    post: async (endpoint: string, data: any) => {
        const token = localStorage.getItem('accessToken');
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'API calling error');
        }

        const responseText = await response.text();
        return responseText ? JSON.parse(responseText) : {};
    }
};

