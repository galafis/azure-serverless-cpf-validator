const { app } = require('@azure/functions');

/**
 * Validates a Brazilian CPF number
 * @param {string} cpf - The CPF number to validate
 * @returns {boolean} - Whether the CPF is valid
 */
function isValidCPF(cpf) {
  // Remove non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '');

  // CPF must have 11 digits
  if (cpf.length !== 11) {
    return false;
  }

  // Reject CPFs with all identical digits
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

/**
 * Formats a CPF number with mask
 * @param {string} cpf - The CPF number to format
 * @returns {string} - Formatted CPF (XXX.XXX.XXX-XX)
 */
function formatCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

app.http('validate-cpf', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('CPF validation function processed a request.');

    let cpf;

    // Get CPF from query parameter or request body
    if (request.method === 'GET') {
      cpf = request.query.get('cpf');
    } else {
      try {
        const body = await request.json();
        cpf = body.cpf;
      } catch (e) {
        cpf = null;
      }
    }

    if (!cpf) {
      return {
        status: 400,
        jsonBody: {
          error: 'Por favor, forneca um numero de CPF. Use o parametro "cpf" na query string ou no corpo da requisicao.'
        }
      };
    }

    // Clean CPF input
    const cleanCPF = cpf.replace(/[^\d]/g, '');

    if (cleanCPF.length !== 11) {
      return {
        status: 400,
        jsonBody: {
          cpf: cpf,
          valid: false,
          message: 'CPF deve conter 11 digitos'
        }
      };
    }

    const valid = isValidCPF(cleanCPF);

    return {
      status: 200,
      jsonBody: {
        cpf: cleanCPF,
        valid: valid,
        formatted: formatCPF(cleanCPF),
        message: valid ? 'CPF valido' : 'CPF invalido'
      }
    };
  }
});
