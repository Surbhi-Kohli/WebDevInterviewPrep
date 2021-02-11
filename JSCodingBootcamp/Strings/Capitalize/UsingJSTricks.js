function capitalize(str) {
  let words=[];
  let ans=[];
  
  for(let word of str.split(' '))
  {
    let first=word[0].toUpperCase();
    let second=word.slice(1);
    word=first+second;
    words.push(word);
   
  }
  words= words.join(' ');
   return words;
}
console.log(capitalize('hi there!, how are you?'));
