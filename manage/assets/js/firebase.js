
const FirstRef = "TopIncurense";
const StaticRef = "Static";
const LeadsRef = "Leads";
const Views_RefString = 'Besure/Static/Views';
const Leads_RefString = 'Besure/Leads';

const refString ={};
refString.Views_RefString=Views_RefString;
refString.Leads_RefString= Leads_RefString;

const PDSTRING = "Password";

const Status ={
    new:'חדש',
    procsess:'בתהליך',
    sold:'סגור'
}
const Refs = {
    
 FirstRef : "TopIncurense",
 StaticRef : "Static",
 LeadsRef :"Leads",
 PDSTRING : "Password",
}




const ReadFrom = (ref,CB) => {
    const collection = firebase.database().ref(ref);
    collection.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log('From readFrom',data);
      CB(data);
      // console.log(Object.keys(data).length)
    })
};

const fetchDataFromFirebase = async (ref) => {
    const collection = firebase.database().ref(ref);

    try {
        const snapshot = await collection.once("value");
        return snapshot.val();
    } catch (error) {
        console.error("Error fetching data from Firebase:", error);
        return null; // or you can handle errors differently based on your requirements
    }
};






const Save2Once= async (ref,value)=>{
    ref = firebase.database().ref(ref);
    try {
        await ref.set(value);
        return true
    } catch (error) {
        console.log('Error in Save2Once '+error);
        return false;
    }

}