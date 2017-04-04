'use strict' 
 
exports.handle = function handle(client) { 
  const sayHello = client.createStep({ 
    satisfied() { 
      return Boolean(client.getConversationState().helloSent) 
    }, 
 
    prompt() { 
      client.addResponse('welcome') 
      client.addResponse('provide/documentation', { 
        documentation_link: 'http://docs.init.ai', 
      }) 
      client.addResponse('provide/instructions') 
      client.updateConversationState({ 
        helloSent: true 
      }) 
      client.done() 
    } 
  }) 
 
  const untrained = client.createStep({ 
    satisfied() { 
      return false 
    }, 
 
    prompt() { 
      client.addResponse('apology/untrained') 
      client.done() 
    } 
  }) 
 
  const handleGreeting = client.createStep({ 
    satisfied() { 
      return false 
    }, 
 
    prompt() { 
      client.addResponse('greeting') 
      client.done() 
    } 
  }) 

  const handleNutrition = client.createStep({ 
    satisfied() { 
      return false 
    }, 
 
    prompt() { 
      client.addResponse('nutrition') 
      client.done() 
    } 
  })
 const handleDotaai = client.createStep({ 
    satisfied() { 
      return false 
    }, 
 
    prompt() { 
      client.addResponse('dotaai') 
      client.done() 
    } 
  })
  const handleGoodbye = client.createStep({ 
    satisfied() { 
      return false 
    }, 
 
    prompt() { 
      client.addResponse('goodbye') 
      client.done() 
    } 
  }) 
 
  client.runFlow({ 
    classifications: { 
      goodbye: 'goodbye', 
      greeting: 'greeting', 
      nutrition: 'nutrition',
      dotaai: 'dotaai' 
    }, 
    streams: { 
      goodbye: handleGoodbye, 
      greeting: handleGreeting, 
      nutrition: handleNutrition, 
      dotaai: handleDotaai, 
      main: 'onboarding', 
      onboarding: [sayHello], 
      end: [untrained] 
    } 
  }) 
} 