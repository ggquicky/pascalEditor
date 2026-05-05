import { Editor } from '@pascal/editor';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Editor 
        projectId="local_playground" 
        baseUrl="https://api.pascal.app" 
        token="playground-token" 
      />
    </div>
  );
}

export default App;
