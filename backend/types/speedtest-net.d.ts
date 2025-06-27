// Declaração de tipo (Type Declaration) para o pacote 'speedtest-net'
// Isso serve como um rascunho para o TypeScript entender o módulo, 
// mesmo que ele não forneça tipos nativos.

declare module 'speedtest-net' {
  // Define que o conteúdo importado (speedTest) pode ser de qualquer tipo.
  // Essa abordagem é usada quando a biblioteca não possui tipagens oficiais 
  // ou completas. Você pode futuramente substituir 'any' por tipos mais precisos.
  const speedTest: any;

  // Define o valor padrão exportado pelo módulo — no caso, a função speedTest.
  export default speedTest;
}