from fastapi import FastAPI
import uvicorn
import torch 

app = FastAPI(title="GPU Compute Service")

@app.get("/health")
def health_check():
    
    gpu_available = torch.cuda.is_available()
    gpu_count = torch.cuda.device_count()
    
    if gpu_available:
        gpu_name = torch.cuda.get_device_name(0)
        status = "READY (GPU OK)"
    else:
        gpu_name = "N/A"
        status = "DEGRADED (CPU ONLY)"
    
    return {
        "status": status,
        "gpu_available": gpu_available,
        "gpu_count": gpu_count,
        "gpu_name": gpu_name,
        "message": "Service is running on GCE VM with FastAPI."
    }

@app.post("/run_compute")
def run_compute(data: dict):
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    try:
        A = torch.randn(100, 100).to(device)
        B = torch.randn(100, 100).to(device)
        C = torch.matmul(A, B)
        result = C.sum().item()
        
        return {
            "status": "Success",
            "device_used": str(device),
            "result_summary": f"Matrix multiplication result sum: {result:.2f}",
            "input_data": data.get("prompt", "No prompt provided")
        }
    except Exception as e:
        return {
            "status": "Error",
            "message": f"GPU/PyTorch operation failed: {e}"
        }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)