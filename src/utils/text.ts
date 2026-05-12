export function truncate(text: string, max_chars: number = 160){
    return text.length > max_chars ? text.substring(0, max_chars) +  " ... " : text;
}