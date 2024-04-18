function getTokenData(token) {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    if (payload && payload.exp) {
      const expiracionTimestamp = payload.exp * 1000; 
        return new Date(expiracionTimestamp);
    }
    return null;
    }

export default getTokenData



// export const JWT_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjTAzNDc1NzZ9.pGh7fs9gE3y1NCzOv1GM3d4Ho8VG8"