import axios from "axios";




const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve,ms))



export const getJudge0LanguageId = (language) =>{
    if(language === "JAVASCRIPT"){

        return 63;

    }else if(language === "PYTHON"){

        return 71;

    }else if(language === "JAVA"){

        return 62;

    }else{

    }
}

export const getLanguageByLanguageId = (id) => {

    const languages = {
        63 : "JAVASCRIPT",
        71: "PYTHON",
        62:"JAVA"
    }

    return languages[id];
}


export const submitBatchToJudge0 = async(submissions) => {
    try {
        console.log(`${process.env.JUDGE0_URL}/submissions/batch?base64_encoded=false`)
        const token = await axios.post(`${process.env.JUDGE0_URL}/submissions/batch?base64_encoded=false`,{
            submissions

        })

        console.log(token)

        return token;
    } catch (error) {
        console.log(error);
        
    }


}


export const submitTokenToJudge0 = async (tokens)=>{
  try {
     while(true){
      const finalresult = await axios.get(`${process.env.JUDGE0_URL}/submissions/batch`,{
          params:{
              tokens:tokens.join(","),
              base64_encoded:false,
          }
      })

      console.log(finalresult)
  
      const results = finalresult.data.submissions;
  
      console.log(results)
  
      const isAllDone = results.every((r)=>r.status.id >=3)
  
      if(isAllDone){
          return results;
      } else {
          sleep(1000);
      }
  
      
     }
  } catch (error) {
      console.log(error);
    
  }

    

}