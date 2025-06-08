import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

// Simple response helper
const createResponse = (statusCode: number, body: any) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  },
  body: JSON.stringify(body)
});

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, {});
  }

  const path = event.path.replace('/.netlify/functions/api', '');
  
  try {
    // Health check
    if (path === '/health' || path === '/api/health') {
      return createResponse(200, { 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        path: path
      });
    }

    // Route to appropriate handler based on path
    if (path.startsWith('/api/deals') || path.startsWith('/deals')) {
      return createResponse(200, { 
        message: 'Deals API endpoint',
        path: path,
        method: event.httpMethod 
      });
    }

    if (path.startsWith('/api/valuation') || path.startsWith('/valuation')) {
      return createResponse(200, { 
        message: 'Valuation API endpoint',
        path: path,
        method: event.httpMethod 
      });
    }

    if (path.startsWith('/api/portfolio') || path.startsWith('/portfolio')) {
      return createResponse(200, { 
        message: 'Portfolio API endpoint',
        path: path,
        method: event.httpMethod 
      });
    }

    if (path.startsWith('/api/auth') || path.startsWith('/auth')) {
      return createResponse(200, { 
        message: 'Auth API endpoint',
        path: path,
        method: event.httpMethod 
      });
    }

    // Default response
    return createResponse(404, { 
      error: 'Endpoint not found',
      path: path,
      availableEndpoints: ['/health', '/deals', '/valuation', '/portfolio', '/auth']
    });

  } catch (error) {
    console.error('Function error:', error);
    return createResponse(500, { 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 