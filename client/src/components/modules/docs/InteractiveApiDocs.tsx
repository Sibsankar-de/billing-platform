"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchStoreList, selectStoreState } from "@/store/features/storeSlice";
import {
  fetchApiKeyListThunk,
  selectApiKeyState,
} from "@/store/features/apiKeySlice";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import {
  Key,
  Lock,
  Unlock,
  Play,
  Copy,
  Check,
  Loader2,
  Database,
  ArrowRight,
  UserCheck,
  RefreshCw,
} from "lucide-react";
import { cn } from "../../utils";

// Define languages supported for code snippets
type CodeLang = "curl" | "javascript" | "python";

// Define shape of endpoints
interface Endpoint {
  id: string;
  method: "GET" | "POST";
  path: string;
  name: string;
  description: string;
  params?: { name: string; type: string; required: boolean; desc: string }[];
  defaultBody?: string;
  mockResponse: (body?: string) => object;
}

const endpoints: Endpoint[] = [
  {
    id: "list-products",
    method: "GET",
    path: "/v1/products",
    name: "List Products",
    description:
      "Retrieve a paginated list of products in your store's inventory.",
    params: [
      {
        name: "limit",
        type: "integer",
        required: false,
        desc: "Number of products to return (default 20).",
      },
      {
        name: "page",
        type: "integer",
        required: false,
        desc: "Page number to fetch.",
      },
    ],
    mockResponse: () => ({
      success: true,
      data: [
        {
          id: "prod_01J0EAW",
          name: "Wireless Ergonomic Mouse",
          sku: "WRLS-MSE-01",
          buyingPrice: 15.0,
          sellingPrice: 29.99,
          stock: 42,
          currency: "USD",
        },
        {
          id: "prod_02K1FBX",
          name: "Bluetooth Mechanical Keyboard",
          sku: "KB-MECH-87",
          buyingPrice: 45.0,
          sellingPrice: 89.99,
          stock: 15,
          currency: "USD",
        },
      ],
    }),
  },
  {
    id: "create-product",
    method: "POST",
    path: "/v1/products",
    name: "Create Product",
    description: "Add a new product item to your store catalog.",
    defaultBody: JSON.stringify(
      {
        name: "USB-C Laptop Docking Station",
        sku: "DOCK-USBC-03",
        buyingPrice: 60.0,
        sellingPrice: 119.99,
        stock: 30,
      },
      null,
      2,
    ),
    mockResponse: (body) => {
      try {
        const parsed = JSON.parse(body || "{}");
        return {
          success: true,
          message: "Product created successfully",
          data: {
            id: `prod_${Math.random().toString(36).substring(2, 9)}`,
            name: parsed.name || "USB-C Laptop Docking Station",
            sku: parsed.sku || "DOCK-USBC-03",
            buyingPrice: parsed.buyingPrice || 60.0,
            sellingPrice: parsed.sellingPrice || 119.99,
            stock: parsed.stock || 30,
            currency: "USD",
            createdAt: new Date().toISOString(),
          },
        };
      } catch (e) {
        return { success: false, error: "Invalid JSON body provided" };
      }
    },
  },
  {
    id: "list-customers",
    method: "GET",
    path: "/v1/customers",
    name: "List Customers",
    description:
      "Retrieve customer list and aggregate statistics for your store.",
    params: [
      {
        name: "searchTerm",
        type: "string",
        required: false,
        desc: "Search customers by name, phone or email.",
      },
    ],
    mockResponse: () => ({
      success: true,
      data: [
        {
          id: "cust_01J0EBF",
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 019-2834",
          invoicesCount: 3,
          totalSpent: 149.97,
        },
        {
          id: "cust_02K1GCA",
          name: "Alice Smith",
          email: "alice.smith@example.com",
          phone: "+1 (555) 048-9921",
          invoicesCount: 1,
          totalSpent: 89.99,
        },
      ],
    }),
  },
  {
    id: "create-invoice",
    method: "POST",
    path: "/v1/invoices",
    name: "Create Invoice",
    description: "Generate a new billing invoice transaction for a customer.",
    defaultBody: JSON.stringify(
      {
        customerId: "cust_01J0EBF",
        items: [
          { productId: "prod_01J0EAW", quantity: 2 },
          { productId: "prod_02K1FBX", quantity: 1 },
        ],
        taxRate: 8.5,
        discount: 5.0,
        paymentMode: "UPI",
      },
      null,
      2,
    ),
    mockResponse: (body) => {
      try {
        const parsed = JSON.parse(body || "{}");
        const subtotal = 149.97; // static simulated math
        const taxAmount = parseFloat(
          ((subtotal * (parsed.taxRate || 8.5)) / 100).toFixed(2),
        );
        const total = parseFloat(
          (subtotal + taxAmount - (parsed.discount || 5.0)).toFixed(2),
        );
        return {
          success: true,
          message: "Invoice generated successfully",
          data: {
            invoiceId: `inv_${new Date().getFullYear()}_${Math.floor(10000 + Math.random() * 90000)}`,
            customerId: parsed.customerId || "cust_01J0EBF",
            items: parsed.items || [],
            subtotal,
            taxRate: parsed.taxRate || 8.5,
            taxAmount,
            discount: parsed.discount || 5.0,
            total,
            paymentMode: parsed.paymentMode || "UPI",
            status: "PAID",
            createdAt: new Date().toISOString(),
          },
        };
      } catch (e) {
        return { success: false, error: "Invalid JSON body provided" };
      }
    },
  },
];

export function InteractiveApiDocs() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();

  // Redux state
  const storeState = useSelector(selectStoreState);
  const apiKeyState = useSelector(selectApiKeyState);

  // Component state
  const [apiKey, setApiKey] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [activeEndpointId, setActiveEndpointId] = useState(endpoints[0].id);
  const [codeLang, setCodeLang] = useState<CodeLang>("curl");
  const [reqBody, setReqBody] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [loadingPlayground, setLoadingPlayground] = useState(false);
  const [playgroundResponse, setPlaygroundResponse] = useState<object | null>(
    null,
  );
  const [responseStatus, setResponseStatus] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  // Fetch store and API key list if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchStoreList())
        .unwrap()
        .then((stores: any[]) => {
          if (stores && stores.length > 0) {
            dispatch(fetchApiKeyListThunk(stores[0]._id));
          }
        });
    }
  }, [isAuthenticated, dispatch]);

  const activeEndpoint =
    endpoints.find((e) => e.id === activeEndpointId) || endpoints[0];

  // Initialize request body when switching endpoints
  useEffect(() => {
    setReqBody(activeEndpoint.defaultBody || "");
    setPlaygroundResponse(null);
    setResponseStatus(null);
    setResponseTime(null);
  }, [activeEndpointId]);

  // Load key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("easeinv_docs_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setActiveKey(savedKey);
    }
  }, []);

  const handleAuthenticate = (keyToUse?: string) => {
    const targetKey = keyToUse || apiKey;
    if (!targetKey.trim()) {
      toast.error("Please enter a valid API Key");
      return;
    }
    localStorage.setItem("easeinv_docs_api_key", targetKey);
    setActiveKey(targetKey);
    setApiKey(targetKey);
    toast.success("API Explorer unlocked successfully!");
  };

  const handleUseDemoKey = () => {
    const demoKey = "sk_easeinv_demo_2026_ab89cf";
    handleAuthenticate(demoKey);
  };

  const handleLogoutKey = () => {
    localStorage.removeItem("easeinv_docs_api_key");
    setActiveKey("");
    setApiKey("");
    setPlaygroundResponse(null);
    toast.info("Session reset");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const runPlayground = async () => {
    setLoadingPlayground(true);
    setPlaygroundResponse(null);
    const start = performance.now();

    // simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const res = activeEndpoint.mockResponse(reqBody);
    const end = performance.now();

    setResponseTime(Math.round(end - start));
    setResponseStatus(
      res.hasOwnProperty("error")
        ? "400 Bad Request"
        : activeEndpoint.method === "POST"
          ? "201 Created"
          : "200 OK",
    );
    setPlaygroundResponse(res);
    setLoadingPlayground(false);
  };

  // Generate snippets
  const getCodeSnippet = (endpoint: Endpoint, lang: CodeLang, key: string) => {
    const headers = `-H "Authorization: Bearer ${key}" \\
  -H "Content-Type: application/json"`;

    if (lang === "curl") {
      if (endpoint.method === "GET") {
        return `curl -X GET https://api.easeinv.com${endpoint.path} \\
  -H "Authorization: Bearer ${key}"`;
      }
      return `curl -X POST https://api.easeinv.com${endpoint.path} \\
  ${headers} \\
  -d '${endpoint.defaultBody?.replace(/\n/g, "\n  ")}'`;
    }

    if (lang === "javascript") {
      if (endpoint.method === "GET") {
        return `fetch('https://api.easeinv.com${endpoint.path}', {
  headers: {
    'Authorization': 'Bearer ${key}'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));`;
      }
      return `fetch('https://api.easeinv.com${endpoint.path}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${key}',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(${endpoint.defaultBody?.replace(/\n/g, "\n  ")})
})
  .then(res => res.json())
  .then(data => console.log(data));`;
    }

    if (lang === "python") {
      if (endpoint.method === "GET") {
        return `import requests

url = "https://api.easeinv.com${endpoint.path}"
headers = {
    "Authorization": "Bearer ${key}"
}

response = requests.get(url, headers=headers)
print(response.json())`;
      }
      return `import requests

url = "https://api.easeinv.com${endpoint.path}"
headers = {
    "Authorization": "Bearer ${key}",
    "Content-Type": "application/json"
}
payload = ${endpoint.defaultBody}

response = requests.post(url, headers=headers, json=payload)
print(response.json())`;
    }

    return "";
  };

  // Helper filter to fetch non-revoked active API Keys
  const activeUserKeys =
    apiKeyState?.data?.apiKeyList?.filter((k: any) => k.status === "ACTIVE") ||
    [];

  /* Render Locked Screen */
  if (!activeKey) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 max-w-xl mx-auto text-center">
        <div className="relative mb-6">
          <div className="absolute -inset-1 rounded-full bg-primary/10 blur-lg animate-pulse" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary border border-primary/20">
            <Lock className="h-8 w-8" />
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
          API Explorer is Protected
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          The interactive API documentation allows making mock requests and
          exploring live endpoint schemas. Authenticate with an active API Key
          to unlock.
        </p>

        {/* Input box */}
        <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-md space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              API Key
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="sk_live_..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-11 pr-4 text-sm text-gray-950 font-mono placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* User API Keys dropdown from database (if authenticated) */}
          {isAuthenticated && activeUserKeys.length > 0 && (
            <div className="space-y-1 text-left bg-gray-50/60 p-3 rounded-lg border border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-primary" /> Select from
                your active keys:
              </span>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {activeUserKeys.map((keyObj: any) => (
                  <button
                    key={keyObj._id}
                    onClick={() => {
                      setApiKey(keyObj.key);
                      handleAuthenticate(keyObj.key);
                    }}
                    className="text-[11px] bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all rounded px-2.5 py-1 text-gray-700 font-mono font-medium shadow-sm"
                  >
                    {keyObj.name} ({keyObj.key.substring(0, 8)}...)
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => handleAuthenticate()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-primary-hover shadow-primary/20 hover:scale-[1.01] transition-all"
          >
            Authenticate Explorer
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative flex py-1.5 items-center">
            <div className="grow border-t border-gray-100"></div>
            <span className="shrink mx-4 text-xs text-gray-400 font-medium">
              Or Use Sandbox
            </span>
            <div className="grow border-t border-gray-100"></div>
          </div>

          <button
            onClick={handleUseDemoKey}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            Use Mock/Demo Key
          </button>
        </div>
      </div>
    );
  }

  /* Render Unlocked API Explorer */
  return (
    <div className="space-y-8">
      {/* Session Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-green-100 bg-green-50/40 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
            <Unlock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              Explorer Authenticated
            </h4>
            <p className="text-xs text-gray-500 font-mono truncate max-w-xs sm:max-w-md">
              Bearer {activeKey.substring(0, 12)}...
            </p>
          </div>
        </div>
        <button
          onClick={handleLogoutKey}
          className="text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
        >
          Reset Session
        </button>
      </div>

      {/* Main Grid: Endpoint List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sub-Sidebar: Endpoint Select */}
        <div className="lg:col-span-4 space-y-2">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2">
            Available Endpoints
          </h4>
          <nav className="flex flex-col gap-1.5">
            {endpoints.map((ep) => {
              const isSelected = activeEndpointId === ep.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => setActiveEndpointId(ep.id)}
                  className={cn(
                    "flex flex-col text-left p-3 rounded-xl border transition-all",
                    isSelected
                      ? "bg-white border-gray-300 shadow-md translate-x-1"
                      : "bg-transparent border-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded font-mono",
                        ep.method === "GET"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700",
                      )}
                    >
                      {ep.method}
                    </span>
                    <span className="text-xs font-semibold font-mono text-gray-900">
                      {ep.path}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium mt-1 pl-1">
                    {ep.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Explorer Panel */}
        <div className="lg:col-span-8 space-y-6">
          {/* Endpoint title */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className={cn(
                  "text-xs font-extrabold px-2.5 py-1 rounded-md font-mono border",
                  activeEndpoint.method === "GET"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-blue-50 text-blue-700 border-blue-200",
                )}
              >
                {activeEndpoint.method}
              </span>
              <h3 className="text-lg font-bold font-mono text-gray-900">
                https://api.easeinv.com{activeEndpoint.path}
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {activeEndpoint.description}
            </p>
          </div>

          {/* Request parameters / inputs */}
          {activeEndpoint.params && activeEndpoint.params.length > 0 && (
            <div className="border border-gray-150 rounded-xl overflow-hidden bg-white">
              <div className="bg-gray-50 border-b border-gray-150 px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Query Parameters
              </div>
              <div className="divide-y divide-gray-100 px-4 py-1">
                {activeEndpoint.params.map((p) => (
                  <div key={p.name} className="py-2.5 flex items-start gap-4">
                    <div className="w-1/3 flex flex-col font-mono">
                      <span className="text-xs font-bold text-gray-950 flex items-center gap-1.5">
                        {p.name}
                        {p.required && (
                          <span
                            className="h-1.5 w-1.5 bg-red-500 rounded-full"
                            title="Required"
                          />
                        )}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {p.type}
                      </span>
                    </div>
                    <p className="w-2/3 text-xs text-gray-600 leading-normal">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Snippet Tabs */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-1.5 border-b border-slate-800">
              <div className="flex gap-2">
                {(["curl", "javascript", "python"] as CodeLang[]).map(
                  (lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeLang(lang)}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded font-medium transition-all capitalize",
                        codeLang === lang
                          ? "bg-slate-800 text-white"
                          : "text-slate-400 hover:text-slate-200",
                      )}
                    >
                      {lang}
                    </button>
                  ),
                )}
              </div>
              <button
                onClick={() =>
                  getCodeSnippet(activeEndpoint, codeLang, activeKey) &&
                  copyToClipboard(
                    getCodeSnippet(activeEndpoint, codeLang, activeKey),
                  )
                }
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded transition-all"
                title="Copy code"
              >
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto select-all leading-relaxed whitespace-pre-wrap">
              {getCodeSnippet(activeEndpoint, codeLang, activeKey)}
            </pre>
          </div>

          {/* Interactive Sandbox Try it Out */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4 text-primary" /> Request Sandbox
              </span>
              <button
                disabled={loadingPlayground}
                onClick={runPlayground}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-xs font-semibold text-white shadow-md transition-all disabled:opacity-50"
              >
                {loadingPlayground ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                Try it Out
              </button>
            </div>

            {/* Editable request body for POST */}
            {activeEndpoint.method === "POST" && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-gray-400">
                  Request Body (JSON)
                </span>
                <textarea
                  value={reqBody}
                  onChange={(e) => setReqBody(e.target.value)}
                  rows={6}
                  className="w-full rounded-xl bg-white border border-gray-200 p-3 font-mono text-xs text-gray-950 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            )}

            {/* Response Console */}
            {(loadingPlayground || playgroundResponse) && (
              <div className="space-y-2 border-t border-gray-200/60 pt-4">
                <div className="flex items-center gap-4 text-xs">
                  <span className="font-bold text-gray-400">
                    RESPONSE CONSOLE:
                  </span>
                  {responseStatus && (
                    <span
                      className={cn(
                        "font-mono font-bold px-1.5 py-0.5 rounded",
                        responseStatus.startsWith("2")
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700",
                      )}
                    >
                      {responseStatus}
                    </span>
                  )}
                  {responseTime && (
                    <span className="font-mono text-gray-400 font-medium">
                      Time: {responseTime} ms
                    </span>
                  )}
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-xs font-mono text-slate-100 overflow-x-auto max-h-80 shadow-inner leading-relaxed">
                  {loadingPlayground ? (
                    <div className="flex items-center gap-2 text-slate-400 py-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Sending request header authentication request...
                    </div>
                  ) : (
                    <pre>{JSON.stringify(playgroundResponse, null, 2)}</pre>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
