import React, { useState, useEffect } from "react";
import { useSignIn, useSignUp, useClerk } from "@clerk/clerk-react";
import { 
  Lock, 
  Unlock, 
  User, 
  Briefcase, 
  Smartphone, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Sparkles, 
  Database, 
  Clock, 
  ArrowRight, 
  Coins, 
  RefreshCw, 
  QrCode, 
  Check, 
  ShieldAlert,
  Sliders,
  Layers,
  ChevronRight,
  TrendingUp,
  Award,
  Users,
  UserPlus,
  Trash2,
  Shield,
  Plus
} from "lucide-react";

interface UserSession {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  language: string;
  preferredWoreda: string;
  loggedIn: boolean;
  isVIP?: boolean;
}

interface EthiopianPortalProps {
  userSession: UserSession;
  setUserSession: React.Dispatch<React.SetStateAction<any>>;
  offlineQueueLength: number;
  quizzesCompleted: number;
  quizScore: number;
  soilCalculations: number;
  chatCount: number;
  onAddOfflineAction: (type: string, label: string, payload: any) => void;
  isOffline: boolean;
  notifications?: any[];
  onSendBroadcast?: (title: string, desc: string, category: string, type: "agri" | "portal" | "cv" | "edu") => void;
  onNavigateToPricing?: () => void;
}

export default function EthiopianPortal({
  userSession,
  setUserSession,
  offlineQueueLength,
  quizzesCompleted,
  quizScore,
  soilCalculations,
  chatCount,
  onAddOfflineAction,
  isOffline,
  notifications = [],
  onSendBroadcast,
  onNavigateToPricing
}: EthiopianPortalProps) {
  // Navigation inside the portal tab: Auth, Dashboard, Payments, Team
  const [portalTab, setPortalTab] = useState<"auth" | "dashboard" | "payments" | "team">("auth");

  // Clerk authentication triggers
  const { isLoaded: isSignInLoaded, signIn, setActive: setActiveSignIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setActiveSignUp } = useSignUp();
  const clerkInstance = useClerk();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [clerkLoading, setClerkLoading] = useState<boolean>(false);
  
  // Local Auth Inputs
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [fullNameInput, setFullNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [faydaIdInput, setFaydaIdInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  // Team states
  const [teamMembers, setTeamMembers] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem("girmaic_team_members");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      { id: "tm-1", fullName: "Kidus Abebe", email: "kidus.abebe@gmail.com", role: "Owner", status: "Active", invitedAt: "2026-06-12T10:30:00Z" },
      { id: "tm-2", fullName: "Dr. Almaz Bekele", email: "almaz.bekele@moa.gov.et", role: "Expert Support", status: "Active", invitedAt: "2026-06-13T14:45:00Z" },
      { id: "tm-3", fullName: "Girmay Kebede", email: "girmay.kebede@girmaic.net", role: "Field Representative", status: "Invited", invitedAt: "2026-06-17T09:12:00Z" },
      { id: "tm-4", fullName: "Sofia Mohammed", email: "sofia.m@gmail.com", role: "Admin", status: "Active", invitedAt: "2026-06-14T11:00:00Z" }
    ];
  });

  const [inviteName, setInviteName] = useState<string>("");
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteRole, setInviteRole] = useState<string>("Field Representative");
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccessMsg, setInviteSuccessMsg] = useState<string | null>(null);

  // Save team members to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("girmaic_team_members", JSON.stringify(teamMembers));
    } catch (e) {}
  }, [teamMembers]);

  // Local Payment Inputs & Simulation Logs
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium">("premium");
  const [paymentProvider, setPaymentProvider] = useState<"telebirr" | "cbe" | "chapa">("telebirr");
  const [payerPhone, setPayerPhone] = useState<string>("+251911234567");
  const [paymentStep, setPaymentStep] = useState<"select" | "qr" | "authorized" | "success">("select");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Custom Live Broadcast Form States
  const [notifInputTitle, setNotifInputTitle] = useState("");
  const [notifInputDesc, setNotifInputDesc] = useState("");
  const [notifInputCategory, setNotifInputCategory] = useState("Expert Advice");
  const [notifInputType, setNotifInputType] = useState<"agri" | "portal" | "cv" | "edu">("portal");
  const [broadcastErrorMsg, setBroadcastErrorMsg] = useState<string | null>(null);
  const [broadcastSuccessMsg, setBroadcastSuccessMsg] = useState<string | null>(null);

  const [developerLogs, setDeveloperLogs] = useState<string[]>([
    "System: Team Registry Module connected.",
    "System: Payment Gateway ready.",
    "Database: Auto-listeners listening local changes."
  ]);

  // Quick logging helpers
  const addLog = (msg: string) => {
    setDeveloperLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);
  };

  const handleDispatchBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastErrorMsg(null);
    setBroadcastSuccessMsg(null);

    if (!notifInputTitle.trim() || !notifInputDesc.trim()) {
      setBroadcastErrorMsg("Provide both a clear title and description to broadcast.");
      return;
    }

    if (onSendBroadcast) {
      onSendBroadcast(
        notifInputTitle.trim(),
        notifInputDesc.trim(),
        notifInputCategory.trim(),
        notifInputType
      );
      setBroadcastSuccessMsg("Incident alert broadcasted successfully!");
      addLog(`Broadcast: dispatched "${notifInputTitle.trim()}" real-time.`);
      setNotifInputTitle("");
      setNotifInputDesc("");
      setTimeout(() => setBroadcastSuccessMsg(null), 4000);
    } else {
      setBroadcastErrorMsg("Communication bridge offline.");
    }
  };

  // Team Management Handlers
  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError(null);
    setInviteSuccessMsg(null);

    if (!userSession?.loggedIn) {
      setInviteError("Identity missing: Log in to send national agronomist invites.");
      addLog("Team Request Denied: Anonymous user is not allowed to invite.");
      return;
    }

    if (!inviteName.trim() || !inviteEmail.trim()) {
      setInviteError("Missing fields: Roster registrant requires Name & Email/Phone ID.");
      addLog("Team Request Fail: Name or Email is not specified.");
      return;
    }

    // Check pre-existing
    const isEmailTaken = teamMembers.some(
      (m) => m.email.toLowerCase() === inviteEmail.trim().toLowerCase()
    );
    if (isEmailTaken) {
      setInviteError(`Duplicate registration: "${inviteEmail}" has already been indexed on this team.`);
      addLog(`Team Conflict: Attempted resubmission of "${inviteEmail}".`);
      return;
    }

    const newMember = {
      id: "tm-" + Math.floor(Math.random() * 90000 + 10000),
      fullName: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      status: "Invited",
      invitedAt: new Date().toISOString()
    };

    setTeamMembers(prev => [...prev, newMember]);
    setInviteSuccessMsg(`Encrypted secure invitation dispatched to ${inviteName}!`);
    addLog(`Team: Dispatched invitation to ${inviteName} (${inviteRole})`);
    
    // Log inside offline action registry
    onAddOfflineAction("INVITE_MEMBER", `Dispatched invitation to ${inviteName}`, {
      email: inviteEmail,
      role: inviteRole
    });

    setInviteName("");
    setInviteEmail("");
  };

  const handleUpdateRole = (memberId: string, newRole: string) => {
    setTeamMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        if (m.role === "Owner") return m; // Owner is static
        addLog(`Team: Promotion trigger. Updated ${m.fullName} role to ${newRole}`);
        return { ...m, role: newRole };
      }
      return m;
    }));
  };

  const handleResendInvite = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      addLog(`Team: Dispatched re-sync beacon to ${member.fullName}'s node`);
      setInviteSuccessMsg(`Reissued invitation to ${member.fullName}.`);
      setTimeout(() => setInviteSuccessMsg(null), 3000);
    }
  };

  const handleRevokeAccess = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return;
    if (member.role === "Owner") {
      addLog("Team: Operation denied. Cannot revoke Owner credentials.");
      return;
    }
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
    addLog(`Team: Revoked key credentials of ${member.fullName}`);
    setInviteSuccessMsg(`Revoked credentials for ${member.fullName}.`);
    setTimeout(() => setInviteSuccessMsg(null), 3500);
  };

  const runTeamSimulation = (action: "accept_girmay" | "bulk_invite" | "clear_all") => {
    if (action === "accept_girmay") {
      setTeamMembers(prev => prev.map(m => {
        if (m.id === "tm-3" || m.fullName.toLowerCase().includes("girmay")) {
          addLog("Success: Girmay Kebede accepted the system invitation through Fayda Gateway.");
          return { ...m, status: "Active" };
        }
        return m;
      }));
    } else if (action === "bulk_invite") {
      const experts = [
        { id: "tm-b1", fullName: "Dr. Tariku Jifar", email: "tariku.jifar@moa.gov.et", role: "Expert Support", status: "Active", invitedAt: new Date().toISOString() },
        { id: "tm-b2", fullName: "Makeda Wolde", email: "makeda.w@girmaic.net", role: "Field Representative", status: "Invited", invitedAt: new Date().toISOString() },
        { id: "tm-b3", fullName: "Abebech Tollosa", email: "abebech.t@gmail.com", role: "Farming Practitioner", status: "Invited", invitedAt: new Date().toISOString() }
      ];
      // Filter duplicates
      setTeamMembers(prev => {
        const filtered = experts.filter(e => !prev.some(p => p.email.toLowerCase() === e.email.toLowerCase()));
        if (filtered.length === 0) {
          addLog("Team Simulation: Bulk members are already present on the team.");
          return prev;
        }
        addLog(`Team Simulation: Dispatched ${filtered.length} pending secure regional invitations.`);
        return [...prev, ...filtered];
      });
    } else if (action === "clear_all") {
      setTeamMembers(prev => prev.filter(m => m.role === "Owner"));
      addLog("Team: Reset roster records. Only system primary Owner retained.");
    }
  };

  // Setup Auth / Test Auth handlers with real Clerk Integrations
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);

    if (authMode === "signin") {
      if (!emailInput || !passwordInput) {
        setAuthError("Credential failure: Email and PIN/Password are required.");
        addLog("Clerk Auth: Sign-in input check failed.");
        return;
      }

      setClerkLoading(true);
      try {
        const result = await signIn.create({
          identifier: emailInput.trim(),
          password: passwordInput,
        });

        if (result.status === "complete") {
          await setActiveSignIn({ session: result.createdSessionId });
          setAuthSuccessMsg("Selam! Signed in successfully with Clerk Securitized credentials.");
          addLog(`Clerk Auth: Successful session established for ${emailInput}`);
        } else {
          setAuthError(`Clerk challenge required: ${result.status}`);
          addLog(`Clerk Auth Check: Incomplete auth status response: ${result.status}`);
        }
      } catch (err: any) {
        setAuthError(err.message || "Invalid email or matching PIN credential password.");
        addLog(`Clerk Auth Warning: Rejected sign-in match.`);
      } finally {
        setClerkLoading(false);
      }
    } else {
      // signup
      if (!fullNameInput || !emailInput || !passwordInput) {
        setAuthError("Registration failure: Full Name, Email, and Password PIN are required.");
        addLog("Clerk Auth: Sign-up credentials incomplete.");
        return;
      }

      setClerkLoading(true);
      try {
        const result = await signUp.create({
          emailAddress: emailInput.trim(),
          password: passwordInput,
          firstName: fullNameInput.split(" ")[0] || "Citizen",
          lastName: fullNameInput.split(" ").slice(1).join(" ") || "Ethiopia",
        });

        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        setIsVerifying(true);
        setAuthSuccessMsg("Registrant token dispatched! Please check your email inbox.");
        addLog(`Clerk Auth: Initiated sign-up process. Sending OTP mail for verification...`);
      } catch (err: any) {
        setAuthError(err.message || "Enrollment mismatch. Choose a stronger passcode or a unique email account.");
        addLog(`Clerk Auth Warning: Registration request denied.`);
      } finally {
        setClerkLoading(false);
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);

    if (!verificationCode) {
      setAuthError("OTP token verification failed: Please enter the code.");
      return;
    }

    setClerkLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode.trim(),
      });

      if (result.status === "complete") {
        await setActiveSignUp({ session: result.createdSessionId });
        setAuthSuccessMsg("Selam! Email account verified. Registration coaligned.");
        setIsVerifying(false);
        addLog(`Clerk Auth Verification: Successfully processed signup OTP verification.`);
      } else {
        setAuthError(`Verification status incomplete: ${result.status}`);
      }
    } catch (err: any) {
      setAuthError(err.message || "Verification code code mismatch. Please check your inbox and retry.");
      addLog(`Clerk Auth Error: Verification failed.`);
    } finally {
      setClerkLoading(false);
    }
  };

  const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_github') => {
    try {
      setAuthError(null);
      setClerkLoading(true);
      if (authMode === "signin") {
        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl: window.location.href,
          redirectUrlComplete: window.location.href,
        });
      } else {
        await signUp.authenticateWithRedirect({
          strategy,
          redirectUrl: window.location.href,
          redirectUrlComplete: window.location.href,
        });
      }
    } catch (err: any) {
      setAuthError(err.message || "Social login redirect failed. Verify network connectivity.");
    } finally {
      setClerkLoading(false);
    }
  };

  // Auth Quick Tests (Developer triggers)
  const runAuthTest = (scenario: "good" | "bad_password" | "offline_cache") => {
    setAuthError(null);
    setAuthSuccessMsg(null);
    if (scenario === "good") {
      setEmailInput("kidus.abebe@gmail.com");
      setPasswordInput("1234");
      addLog("Test Auth: Autofilled test credentials.");
    } else if (scenario === "bad_password") {
      setEmailInput("girmay.kebede@hotmail.com");
      setPasswordInput("2"); // will trigger validation error
      addLog("Test Auth: Loaded negative password scenario.");
    } else if (scenario === "offline_cache") {
      if (isOffline) {
        setAuthSuccessMsg("Offline authentication: Authenticated via encrypted localStorage cached fallback keys.");
        addLog("Test Auth: Offline cached profile bypassed online gateway successfully.");
      } else {
        setAuthError("Test Auth requires Offline Switch to be active!");
        addLog("Test Auth Error: Bypassed offline triggers in active network state.");
      }
    }
  };

  // Dashboard Developer Simulation triggers
  const triggerDashboardSimulation = (metric: "points" | "queue_inject" | "wipe") => {
    if (metric === "points") {
      addLog("Dashboard Test: Simulated completing new curriculum modules. +50 XP");
    } else if (metric === "queue_inject") {
      onAddOfflineAction("TELEBIRR_BILL", "Premium Voucher Upgrade", { amount: 150, currency: "ETB" });
      addLog("Dashboard Test: Injected Telebirr offline bill action to local cache.");
    } else if (metric === "wipe") {
      clerkInstance.signOut();
      setUserSession(prev => ({ ...prev, loggedIn: false }));
      addLog("Dashboard Test: Reset current authentication state.");
    }
  };

  // Adding Payments / Payments Simulation
  const handlePaymentInitiate = () => {
    setPaymentError(null);
    if (!payerPhone.startsWith("+251") || payerPhone.length < 12) {
      setPaymentError("Telebirr error: Ethiopian phone numbers must follow +251XXXXXXXXX standard.");
      addLog("Payment error: National area routing exception.");
      return;
    }
    setPaymentStep("qr");
    addLog(`Billing: Generated ${paymentProvider.toUpperCase()} merchant API contract. Amount: 150 ETB.`);
  };

  const verifyPaymentSimulation = (outcome: "success" | "insufficient" | "cbe_timeout") => {
    setPaymentError(null);
    if (outcome === "success") {
      setPaymentStep("success");
      setUserSession(prev => ({ ...prev, isVIP: true }));
      addLog(`Success: received instant webhook callback from ${paymentProvider.toUpperCase()}`);
    } else if (outcome === "insufficient") {
      setPaymentError(`${paymentProvider.toUpperCase()} callback: [Error 412] Insufficient Balance inside mobile wallet.`);
      addLog(`Payment Error: Insufficient funds trigger received.`);
    } else if (outcome === "cbe_timeout") {
      setPaymentError("CBE Birr API error: Connection timeout from parent network switch. Try again.");
      addLog(`Payment Error: Main regional hub ping timeout.`);
    }
  };

  return (
    <div className="flex-1 flex flex-col space-y-4 transition-all animate-fade-in text-[11px] font-sans">
      
      {/* Tab Selectors */}
      <div className="flex bg-stone-950 p-1 rounded-xl border border-white/5 space-x-1 select-none">
        <button
          onClick={() => setPortalTab("auth")}
          className={`flex-1 py-1.5 rounded-lg text-center font-bold tracking-tight transition-all uppercase text-[7.5px] whitespace-nowrap flex flex-col sm:flex-row items-center justify-center gap-0.5 cursor-pointer ${
            portalTab === "auth" ? "bg-stone-800 text-[#E5D3B3]" : "text-stone-400 hover:text-white"
          }`}
        >
          <Lock size={10} />
          <span>Auth</span>
        </button>
        <button
          onClick={() => setPortalTab("dashboard")}
          className={`flex-1 py-1.5 rounded-lg text-center font-bold tracking-tight transition-all uppercase text-[7.5px] whitespace-nowrap flex flex-col sm:flex-row items-center justify-center gap-0.5 cursor-pointer ${
            portalTab === "dashboard" ? "bg-stone-800 text-[#E5D3B3]" : "text-stone-400 hover:text-white"
          }`}
        >
          <TrendingUp size={10} />
          <span>KPIs</span>
        </button>
        <button
          onClick={() => setPortalTab("payments")}
          className={`flex-1 py-1.5 rounded-lg text-center font-bold tracking-tight transition-all uppercase text-[7.5px] whitespace-nowrap flex flex-col sm:flex-row items-center justify-center gap-0.5 cursor-pointer ${
            portalTab === "payments" ? "bg-stone-800 text-[#E5D3B3]" : "text-stone-400 hover:text-white"
          }`}
        >
          <CreditCard size={10} />
          <span>Pay</span>
        </button>
        <button
          onClick={() => setPortalTab("team")}
          className={`flex-1 py-1.5 rounded-lg text-center font-bold tracking-tight transition-all uppercase text-[7.5px] whitespace-nowrap flex flex-col sm:flex-row items-center justify-center gap-0.5 cursor-pointer ${
            portalTab === "team" ? "bg-stone-800 text-[#E5D3B3]" : "text-stone-400 hover:text-white"
          }`}
        >
          <Users size={10} />
          <span>Team</span>
        </button>
      </div>

      {/* Screen Views */}
      {portalTab === "auth" && (
        <div className="space-y-3.5">
          {/* Header */}
          <div className="flex justify-between items-center bg-stone-950 p-2.5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-[#CD5C5C]/15 text-[#CD5C5C]">
                {userSession.loggedIn ? <Unlock size={12} /> : <Lock size={12} />}
              </div>
              <div>
                <span className="font-extrabold text-white block uppercase text-[10px]">Secure Identity Portal</span>
                <span className="text-[8px] text-stone-400 font-mono">
                  {userSession.loggedIn ? `LOGGED IN: ${userSession.fullName}` : "AUTHENTICATION SERVICE DISCONNECTED"}
                </span>
              </div>
            </div>
            {userSession.loggedIn && (
              <button 
                onClick={async () => {
                  try {
                    await clerkInstance.signOut();
                    setUserSession(prev => ({ ...prev, loggedIn: false }));
                    addLog("User: Signed out via Clerk API.");
                  } catch (err: any) {
                    setUserSession(prev => ({ ...prev, loggedIn: false }));
                  }
                }} 
                className="p-1 px-2 border border-red-500/30 hover:border-red-500 rounded bg-red-950/20 text-red-400 uppercase text-[8px] font-black tracking-tight cursor-pointer"
              >
                Signout
              </button>
            )}
          </div>

          {/* Form */}
          {!userSession.loggedIn ? (
            <form onSubmit={handleAuthSubmit} className="space-y-3 bg-stone-950/70 p-3.5 rounded-2xl border border-white/5">
              <div className="flex border-b border-white/5 pb-2 text-[9px] font-mono gap-3 uppercase select-none">
                <button type="button" onClick={() => setAuthMode("signin")} className={`font-bold pb-1 ${authMode === "signin" ? "border-b border-rose-400 text-rose-400" : "text-stone-500"}`}>SignIn Account</button>
                <button type="button" onClick={() => setAuthMode("signup")} className={`font-bold pb-1 ${authMode === "signup" ? "border-b border-rose-400 text-rose-400" : "text-stone-500"}`}>Register (Fayda ID)</button>
              </div>

              {authMode === "signup" && (
                <div className="space-y-1 animate-fade-in">
                  <label className="text-[8px] text-stone-400 uppercase tracking-widest block">Citizens Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Kidus Abebe" 
                    value={fullNameInput} 
                    onChange={e => setFullNameInput(e.target.value)} 
                    className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none focus:border-rose-400"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[8px] text-stone-400 uppercase tracking-widest block">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. kidus@gmail.com" 
                  value={emailInput} 
                  onChange={e => setEmailInput(e.target.value)} 
                  className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none focus:border-rose-400"
                />
              </div>

              {authMode === "signup" && (
                <div className="space-y-1 animate-fade-in">
                  <label className="text-[8px] text-stone-400 uppercase tracking-widest block">National Fayda ID #</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ET-992-H84-912" 
                    value={faydaIdInput} 
                    onChange={e => setFaydaIdInput(e.target.value)} 
                    className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none focus:border-rose-400"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[8px] text-stone-400 uppercase tracking-widest block">Ethiopian Phone (+251)</label>
                <input 
                  type="text" 
                  placeholder="+251911234567" 
                  value={phoneInput} 
                  onChange={e => setPhoneInput(e.target.value)} 
                  className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] text-stone-400 uppercase tracking-widest block">Access PIN / Password</label>
                <input 
                  type="password" 
                  placeholder="Min 4 numbers" 
                  value={passwordInput} 
                  onChange={e => setPasswordInput(e.target.value)} 
                  className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none focus:border-rose-400"
                />
              </div>

              {authError && (
                <div className="p-2.5 bg-red-950/40 border border-red-500/20 text-red-300 rounded-lg flex items-start gap-1.5 leading-relaxed text-[9px]">
                  <AlertCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccessMsg && (
                <div className="p-2.5 bg-green-950/40 border border-green-500/20 text-green-300 rounded-lg flex items-start gap-1.5 text-[9px]">
                  <CheckCircle size={12} className="text-green-400 shrink-0 mt-0.5" />
                  <span>{authSuccessMsg}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-2 bg-[#CD5C5C] text-white font-extrabold rounded-lg flex items-center justify-center gap-1"
              >
                <span>{authMode === "signin" ? "Unlock Access Session" : "Create Registrant Profile"}</span>
                <ArrowRight size={12} />
              </button>
            </form>
          ) : (
            <div className="p-4 bg-stone-950 text-[#E5D3B3] rounded-2xl border border-white/5 space-y-3">
              <div className="flex gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#CD5C5C]/10 border border-[#CD5C5C]/30 flex items-center justify-center font-black text-lg text-white">
                  {userSession.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">{userSession.fullName}</h4>
                  <p className="text-[9px] text-stone-400">{userSession.email}</p>
                  <p className="text-[8px] text-stone-500 mt-0.5 leading-none">ROLE: REGIONAL VISITOR • ID: {userSession.uid}</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-2.5 space-y-1.5 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-stone-400">Regional Affiliation:</span>
                  <span className="text-white font-mono">{userSession.preferredWoreda}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Phone Gateway:</span>
                  <span className="text-white font-mono">{userSession.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Account Flag:</span>
                  {userSession.isVIP ? (
                    <span className="text-[#DAA520] font-black flex items-center gap-1"><Sparkles size={10} /> PREMIUM VIP</span>
                  ) : (
                    <span className="text-stone-500 flex items-center gap-1">STANDARD FREE</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Test Auth Playground suite */}
          <div className="p-3.5 bg-stone-900 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider font-extrabold text-[#E5D3B3]">
              <Sliders size={11} />
              <span>TEST SUITE ACTIONS • AUTH ENTITY</span>
            </div>
            
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => runAuthTest("good")}
                className="py-1 px-2 border border-white/5 hover:bg-stone-800 text-[9px] text-left rounded text-stone-300 font-mono transition-all"
              >
                👉 Load Valid kidus@
              </button>
              <button 
                onClick={() => runAuthTest("bad_password")}
                className="py-1 px-2 border border-white/5 hover:bg-stone-800 text-[9px] text-left rounded text-stone-300 font-mono transition-all"
              >
                💥 Trigger PIN failure
              </button>
              <button 
                onClick={() => runAuthTest("offline_cache")}
                className="py-1 px-2 border border-white/5 hover:bg-stone-800 text-[9px] text-left col-span-2 rounded text-stone-300 font-mono transition-all"
              >
                💾 Force Offline Cache Credentials
              </button>
            </div>
          </div>
        </div>
      )}

      {portalTab === "dashboard" && (
        <div className="space-y-3.5">
          {/* Main Analytics Cards Grid */}
          <div className="grid grid-cols-2 gap-2 text-center text-white">
            <div className="p-3 bg-stone-950 rounded-xl border border-white/5">
              <span className="text-[8px] text-stone-400 block uppercase font-mono tracking-wider">Tutor Quizzes Solve</span>
              <p className="text-base font-black text-purple-400">{quizzesCompleted}</p>
              <span className="text-[8px] text-stone-500 block mt-0.5">{quizScore} correct submissions</span>
            </div>
            <div className="p-3 bg-stone-950 rounded-xl border border-white/5">
              <span className="text-[8px] text-stone-400 block uppercase font-mono tracking-wider">Soil Calcs Log</span>
              <p className="text-base font-black text-yellow-400">{soilCalculations}</p>
              <span className="text-[8px] text-stone-500 block mt-0.5">fertilizer projections</span>
            </div>
            <div className="p-3 bg-stone-950 rounded-xl border border-white/5">
              <span className="text-[8px] text-stone-400 block uppercase font-mono tracking-wider">Chat Queries</span>
              <p className="text-base font-black text-rose-400">{chatCount}</p>
              <span className="text-[8px] text-stone-500 block mt-0.5">translated answers</span>
            </div>
            <div className="p-3 bg-stone-950 rounded-xl border border-white/5">
              <span className="text-[8px] text-stone-400 block uppercase font-mono tracking-wider">Local Queue Buffer</span>
              <p className="text-base font-black text-teal-400">{offlineQueueLength}</p>
              <span className="text-[8px] text-stone-500 block mt-0.5">pending synchronization</span>
            </div>
          </div>

          {/* REAL-TIME NOTIFICATION STREAM FEED */}
          <div className="p-3 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
            <div className="flex justify-between items-center border-b border-white/5 pb-1.5 select-none">
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOffline ? "bg-red-400" : "bg-[#DAA520]"}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isOffline ? "bg-red-500" : "bg-[#DAA520]"}`}></span>
                </span>
                <span className="font-extrabold text-[9px] uppercase tracking-wider text-white">Live Alert Ticker</span>
              </div>
              <span className="text-[8px] text-stone-400 font-mono">
                {isOffline ? "🔴 OFFLINE RECON" : "⚡ STREAM ACTIVE"}
              </span>
            </div>

            {/* Notifications Feed list */}
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-0.5">
              {notifications.length === 0 ? (
                <div className="py-4 text-center text-stone-500 italic text-[9px] font-serif">
                  Awaiting real-time broadcast signals...
                </div>
              ) : (
                notifications.slice(0, 10).map((n) => (
                  <div key={n.id} className="p-2 bg-stone-900/60 border border-white/5 rounded-xl flex flex-col gap-0.5 relative overflow-hidden group">
                    <div className="flex justify-between items-center">
                      <span className="text-[7px] font-mono uppercase bg-stone-950 px-1 py-0.2 rounded text-stone-300 tracking-tighter">
                        {n.category}
                      </span>
                      <span className="text-[7px] text-stone-500 font-mono shrink-0">{n.time}</span>
                    </div>
                    <span className="font-extrabold text-white text-[9px] leading-tight block">{n.title}</span>
                    <p className="text-[8px] text-stone-400 leading-normal">{n.desc}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* EMERGENCY NATIONAL BROADCASTER DISPATCH CONSOLE */}
          <div className="p-3 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 text-[#E5D3B3]">
              <Database size={11} className="text-[#DAA520]" />
              <span className="font-black text-[9px] uppercase tracking-wider">Broadcast Dispatch Console</span>
            </div>
            
            <form onSubmit={handleDispatchBroadcast} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label className="text-[7.5px] text-stone-500 uppercase tracking-widest font-mono">Alert Subject</label>
                  <input
                    type="text"
                    placeholder="e.g., Heavy Rainfall Forecast"
                    value={notifInputTitle}
                    onChange={(e) => setNotifInputTitle(e.target.value)}
                    className="w-full bg-stone-900 border border-white/10 rounded-lg p-1 text-[9px] text-white outline-none focus:border-[#DAA520]"
                  />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[7.5px] text-stone-500 uppercase tracking-widest font-mono">Alert Category</label>
                  <select
                    value={notifInputCategory}
                    onChange={(e) => setNotifInputCategory(e.target.value)}
                    className="w-full bg-stone-900 border border-white/10 rounded-lg p-1 text-[9px] text-white outline-none focus:border-[#DAA520] cursor-pointer"
                  >
                    <option value="Soil Warning">Soil Warning</option>
                    <option value="Curriculum Flash">Curriculum Flash</option>
                    <option value="Auth Shield">Auth Shield</option>
                    <option value="Payment Notify">Payment Notify</option>
                  </select>
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="text-[7.5px] text-stone-500 uppercase tracking-widest font-mono">Full Safety / Informative Detail Dispatch text</label>
                <input
                  type="text"
                  placeholder="e.g., Extreme high humidity is forecast for Amhara region Woredas. Advise legume coverage."
                  value={notifInputDesc}
                  onChange={(e) => setNotifInputDesc(e.target.value)}
                  className="w-full bg-stone-900 border border-white/10 rounded-lg p-1 text-[9px] text-white outline-none focus:border-[#DAA520]"
                />
              </div>

              {broadcastErrorMsg && (
                <div className="p-1 px-2 border border-red-500/20 bg-red-950/25 text-red-300 rounded text-[7.5px] leading-none">
                  ⚠️ {broadcastErrorMsg}
                </div>
              )}

              {broadcastSuccessMsg && (
                <div className="p-1 px-2 border border-green-500/20 bg-green-950/25 text-green-300 rounded text-[7.5px] leading-none animate-pulse">
                  ✓ {broadcastSuccessMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-1.5 bg-[#DAA520] hover:bg-[#c6951b] text-stone-950 font-black rounded-lg text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span>Transmit Real-Time National Alert</span>
              </button>
            </form>
          </div>

          {/* Test Dashboard section */}
          <div className="p-3 bg-stone-900 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 text-[8px] font-mono tracking-wider font-extrabold text-[#E5D3B3]">
              <Award size={10} />
              <span>TEST SUITE ACTIONS • DASHBOARD</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1">
              <button 
                onClick={() => triggerDashboardSimulation("points")}
                className="py-1 px-1 bg-stone-950 border border-white/5 hover:bg-stone-800 text-[8px] text-center rounded text-stone-300 font-mono transition-all cursor-pointer"
              >
                📈 XP (+50)
              </button>
              <button 
                onClick={() => triggerDashboardSimulation("queue_inject")}
                className="py-1 px-1 bg-stone-950 border border-white/5 hover:bg-stone-800 text-[8px] text-center rounded text-stone-300 font-mono transition-all cursor-pointer"
              >
                📥 Inject Bill
              </button>
              <button 
                onClick={() => triggerDashboardSimulation("wipe")}
                className="py-1 px-1 bg-stone-950 border border-white/5 hover:bg-stone-800 text-[8px] text-center rounded text-stone-300 font-mono transition-all cursor-pointer"
              >
                🔄 Lock Auth
              </button>
            </div>
          </div>
        </div>
      )}

      {portalTab === "payments" && (
        <div className="space-y-4 animate-fade-in text-[11px]">
          
          {userSession.isVIP ? (
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle size={24} className="text-emerald-400 mx-auto" />
              <h4 className="font-extrabold uppercase tracking-wide text-xs">Vouching System Premium Unlocked</h4>
              <p className="text-[10px] text-stone-300 leading-normal">Your account possesses unconditional premium query priority. CBE & Telebirr integrations successfully mapped.</p>
              <button 
                onClick={() => {
                  setUserSession(prev => ({ ...prev, isVIP: false }));
                  addLog("Payment: Revoked VIP license status.");
                }} 
                className="py-1 px-3 border border-red-500/30 text-rose-300 bg-red-950/10 text-[9px] font-bold rounded hover:bg-red-950/30"
              >
                Revoke Premium Option
              </button>
            </div>
          ) : (
            <>
              {paymentStep === "select" && (
                <div className="space-y-3.5">
                  <div className="bg-stone-950 p-3 rounded-2xl border border-white/5 space-y-1 text-center">
                    <span className="text-[8px] text-rose-400 font-bold uppercase tracking-widest leading-none">Select Access Voucher</span>
                    <h4 className="font-bold text-white text-xs">Premium Study & Farm Guide Priority</h4>
                    <p className="text-[10px] text-stone-400 leading-relaxed max-w-[280px] mx-auto">Get unlimited regional calculations, live STEM study files, custom pdf generation, and voice offline capabilities.</p>
                  </div>

                  {/* Redirection Banner Key to Centralized Pricing system */}
                  {onNavigateToPricing && (
                    <div className="p-3 bg-gradient-to-r from-stone-900 via-stone-900 to-[#DAA520]/15 rounded-xl border border-[#DAA520]/30 select-none flex items-center justify-between gap-1.5">
                      <div className="space-y-0.5">
                        <span className="text-[8.5px] font-bold text-white flex items-center gap-1.5">
                          <Sparkles size={8} className="text-[#DAA520]" />
                          Multi-tier Plans Active
                        </span>
                        <p className="text-[7.5px] text-stone-400">
                          Configure monthly or yearly pricing via Telebirr or Stripe nodes.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={onNavigateToPricing}
                        className="py-1 px-2.5 bg-[#DAA520] hover:bg-[#caa023] text-stone-950 text-[8px] font-black uppercase rounded-lg transition-all shrink-0 cursor-pointer"
                      >
                        Open Plans ➔
                      </button>
                    </div>
                  )}

                  {/* Payment Methods selector */}
                  <div className="space-y-2">
                    <label className="text-[8px] text-stone-400 uppercase tracking-widest block">Select Payment Channel</label>
                    <div className="grid grid-cols-3 gap-1.5 select-none text-[10px]">
                      <button 
                        type="button"
                        onClick={() => setPaymentProvider("telebirr")}
                        className={`py-2 px-1 rounded-xl text-center font-bold border transition-all cursor-pointer ${
                          paymentProvider === "telebirr" ? "border-sky-500 bg-sky-950/15 text-sky-200" : "border-white/5 bg-stone-900/30 text-stone-400"
                        }`}
                      >
                        Telebirr
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentProvider("cbe")}
                        className={`py-2 px-1 rounded-xl text-center font-bold border transition-all cursor-pointer ${
                          paymentProvider === "cbe" ? "border-purple-500 bg-purple-950/15 text-purple-200" : "border-white/5 bg-stone-900/30 text-stone-400"
                        }`}
                      >
                        CBE Birr
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentProvider("chapa")}
                        className={`py-2 px-1 rounded-xl text-center font-bold border transition-all cursor-pointer ${
                          paymentProvider === "chapa" ? "border-emerald-500 bg-emerald-950/15 text-emerald-200" : "border-white/5 bg-stone-900/30 text-stone-400"
                        }`}
                      >
                        Chapa / Card
                      </button>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-1">
                    <label className="text-[8px] text-stone-400 uppercase tracking-widest block">Ethiopian Payer Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="+251911234567" 
                      value={payerPhone} 
                      onChange={e => setPayerPhone(e.target.value)} 
                      className="w-full bg-stone-900 border border-white/10 rounded-lg p-1.5 text-white outline-none"
                    />
                  </div>

                  {paymentError && (
                    <div className="p-2 bg-red-950/40 border border-red-500/20 text-red-300 rounded-lg flex items-start gap-1.5 text-[9px] leading-relaxed">
                      <AlertCircle size={12} className="text-red-400 shrink-0 mt-0.5" />
                      <span>{paymentError}</span>
                    </div>
                  )}

                  <button 
                    onClick={handlePaymentInitiate}
                    className="w-full py-2.5 bg-[#DAA520] hover:bg-[#c6951b] text-stone-950 font-black rounded-lg text-xs tracking-tight flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Coins size={12} />
                    <span>Initiate 150.00 Birr Payment</span>
                  </button>
                </div>
              )}

              {paymentStep === "qr" && (
                <div className="space-y-3.5 text-center animate-fade-in bg-stone-950/90 p-4 rounded-2xl border border-white/5">
                  <span className="text-[8px] text-stone-400 font-mono tracking-widest uppercase block">Gateway Merchant Intermediary</span>
                  
                  {/* Generated QR Code placeholder */}
                  <div className="w-32 h-32 bg-white rounded-xl p-2 mx-auto shadow-lg relative flex items-center justify-center border border-stone-200">
                    <div className="w-full h-full border border-stone-400/30 rounded flex items-center justify-center text-stone-900 relative">
                      <QrCode size={90} className="text-stone-950" />
                      <div className="absolute bg-[#1b1b1b] text-[8px] text-white font-black uppercase font-mono tracking-tight px-1 rounded-sm scale-90 border border-stone-800">
                        {paymentProvider.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/90 leading-relaxed font-serif max-w-[200px] mx-auto italic">
                    Scan using your local mobile banking application or select test sandbox results below.
                  </p>

                  <div className="text-[9px] text-stone-400 flex items-center justify-center gap-1.5">
                    <Clock size={11} className="text-yellow-500 animate-spin" />
                    <span>Awaiting live payment webhook event...</span>
                  </div>

                  <button 
                    onClick={() => setPaymentStep("select")}
                    className="text-[9px] text-stone-500 font-bold hover:text-stone-300"
                  >
                    Go Back
                  </button>
                </div>
              )}
            </>
          )}

          {/* Test Payments Playground triggers */}
          <div className="p-3.5 bg-stone-900 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-wider font-extrabold text-[#E5D3B3]">
              <Sliders size={11} />
              <span>TEST SUITE ACTIONS • PAYMENTS GATEWAY</span>
            </div>
            
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => verifyPaymentSimulation("success")}
                disabled={paymentStep === "select"}
                className={`py-1 px-2 border text-[9px] text-left rounded font-mono transition-all ${
                  paymentStep === "select" ? "border-white/5 text-stone-600 cursor-not-allowed" : "border-white/10 hover:bg-stone-800 text-green-300"
                }`}
              >
                🟢 Telebirr Callback Success
              </button>
              <button 
                onClick={() => verifyPaymentSimulation("insufficient")}
                disabled={paymentStep === "select"}
                className={`py-1 px-2 border text-[9px] text-left rounded font-mono transition-all ${
                  paymentStep === "select" ? "border-white/5 text-stone-600 cursor-not-allowed" : "border-white/10 hover:bg-stone-800 text-rose-300"
                }`}
              >
                🔴 Simulate Insufficient Funds
              </button>
              <button 
                onClick={() => verifyPaymentSimulation("cbe_timeout")}
                disabled={paymentStep === "select"}
                className={`py-1 px-2 border text-[9px] text-left col-span-2 rounded font-mono transition-all ${
                  paymentStep === "select" ? "border-white/5 text-stone-600 cursor-not-allowed" : "border-white/10 hover:bg-stone-800 text-yellow-300"
                }`}
              >
                ⚠️ Simulate CBE Gateway Timeout Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {portalTab === "team" && (
        <div className="space-y-4 animate-fade-in text-stone-200">
          {/* Header */}
          <div className="flex justify-between items-center bg-stone-950 p-2.5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-amber-400/10 text-amber-400">
                <Users size={12} />
              </div>
              <div>
                <span className="font-extrabold text-white block uppercase text-[10px]">National Team Registry</span>
                <span className="text-[8px] text-stone-400 font-mono block">
                  ACTIVE ROSTER WORKSPACE MEMBERS
                </span>
              </div>
            </div>
            <span className="p-1 px-1.5 border border-[#E5D3B3]/20 rounded bg-stone-900 text-[#E5D3B3] text-[8px] font-mono tracking-tighter">
              {teamMembers.length} MEMBERS
            </span>
          </div>

          {/* Active Members & Roles List */}
          <div className="space-y-2">
            <h5 className="text-[8px] uppercase tracking-wider text-stone-400 font-bold block">Agronomist & Expert Roster</h5>
            
            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-2.5 bg-stone-950 border border-white/5 rounded-xl space-y-2 flex flex-col justify-between transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-lg bg-stone-900 border border-white/10 flex items-center justify-center font-bold text-[10px] text-stone-300 shrink-0 select-none">
                        {member.fullName.charAt(0)}
                      </div>
                      <div className="leading-tight">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-white text-[10px]">{member.fullName}</span>
                          {member.status === "Invited" ? (
                            <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-500/20 rounded text-[7px] font-medium leading-none animate-pulse">
                              Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 px-1 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 rounded text-[7px] font-medium leading-none">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[8px] text-stone-400 font-mono mt-0.5">{member.email}</p>
                      </div>
                    </div>

                    {/* Trash revoke option */}
                    {member.role !== "Owner" && (
                      <button 
                        type="button"
                        onClick={() => handleRevokeAccess(member.id)}
                        className="p-1 text-stone-500 hover:text-red-400 hover:bg-red-950/20 rounded transition-all cursor-pointer border-0 outline-none"
                        title="Revoke access"
                      >
                        <Trash2 size={10} />
                      </button>
                    )}
                  </div>

                  <div className="flex justify-between items-center border-t border-white/5 pt-1.5 text-[8px] font-mono">
                    <div className="flex items-center gap-1 text-stone-400 select-none">
                      <Shield size={9} className="text-stone-500" />
                      <span>Role Scope:</span>
                    </div>

                    {member.role === "Owner" ? (
                      <span className="inline-block px-1.5 py-0.5 rounded border border-purple-500/30 bg-purple-950/20 text-purple-300 font-extrabold uppercase">
                        {member.role}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <select
                          value={member.role}
                          onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                          className="bg-stone-900 text-stone-300 text-[8px] rounded border border-white/10 p-0.5 outline-none font-sans font-bold cursor-pointer"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Expert Support">Expert Support</option>
                          <option value="Field Representative">Field Rep</option>
                          <option value="Farming Practitioner">Practitioner</option>
                        </select>
                        
                        {member.status === "Invited" && (
                          <button
                            type="button"
                            onClick={() => handleResendInvite(member.id)}
                            className="bg-stone-800 hover:bg-stone-700 text-[#E5D3B3] py-0.5 px-1.5 rounded border border-white/5 font-sans uppercase font-black cursor-pointer"
                          >
                            Resend
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invitation Despatcher Form */}
          <div className="p-3 bg-stone-950 rounded-2xl border border-white/5 space-y-2.5">
            <div className="flex items-center gap-1 text-[#E5D3B3]">
              <UserPlus size={11} />
              <span className="font-extrabold text-[9px] uppercase tracking-wider">Invite Team Expert</span>
            </div>

            {!userSession?.loggedIn ? (
              <div className="p-2 border border-dashed border-white/10 bg-stone-900/40 rounded-xl text-center">
                <span className="text-[8.5px] text-stone-400 italic block">Session Locked: An active Fayda citizen identity is required to dispatch secure team invites.</span>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[7px] text-stone-500 uppercase tracking-widest block font-mono">Expert Name</label>
                    <input 
                      type="text" 
                      placeholder="Dr. Tariku Jifar" 
                      value={inviteName}
                      onChange={e => setInviteName(e.target.value)}
                      className="w-full bg-stone-900 border border-white/10 rounded-lg p-1 text-[9px] text-white outline-none focus:border-[#E5D3B3]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[7px] text-stone-500 uppercase tracking-widest block font-mono">Mail / Phone ID</label>
                    <input 
                      type="text" 
                      placeholder="tariku@girmaic.net" 
                      value={inviteEmail}
                      onChange={e => setInviteEmail(e.target.value)}
                      className="w-full bg-stone-900 border border-white/10 rounded-lg p-1 text-[9px] text-white outline-none focus:border-[#E5D3B3]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[7px] text-stone-500 uppercase tracking-widest block font-mono">Assigned Roster Role</label>
                  <select
                    value={inviteRole}
                    onChange={e => setInviteRole(e.target.value)}
                    className="w-full bg-stone-900 border border-white/10 rounded-lg p-1 text-[9px] text-white outline-none focus:border-[#E5D3B3] cursor-pointer"
                  >
                    <option value="Admin">Admin (Full Administrative Access)</option>
                    <option value="Expert Support">Expert Support (Scientific approvals)</option>
                    <option value="Field Representative">Field Representative (Soil Advisories)</option>
                    <option value="Farming Practitioner">Farming Practitioner (Roster general)</option>
                  </select>
                </div>

                {inviteError && (
                  <div className="p-1 px-2 border border-red-500/20 bg-red-950/20 text-red-300 rounded text-[8px] flex items-center gap-1.5 animate-bounce">
                    <AlertCircle size={10} className="text-red-400 shrink-0" />
                    <span>{inviteError}</span>
                  </div>
                )}

                {inviteSuccessMsg && (
                  <div className="p-1 px-2 border border-green-500/20 bg-green-950/20 text-green-300 rounded text-[8px] flex items-center gap-1.5">
                    <CheckCircle size={10} className="text-green-400 shrink-0" />
                    <span>{inviteSuccessMsg}</span>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-1.5 bg-[#E5D3B3] hover:bg-white text-stone-950 font-black rounded-lg text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <Plus size={10} />
                  <span>Send Onboarding Invite</span>
                </button>
              </form>
            )}
          </div>

          {/* Test Team Playground triggers */}
          <div className="p-3 bg-stone-900 border border-white/5 rounded-xl space-y-2">
            <div className="flex items-center gap-1 text-[8.5px] font-mono tracking-wider font-extrabold text-[#E5D3B3] select-none">
              <Sliders size={11} />
              <span>TEST SUITE ACTIONS • TEAM REGISTRY SECURE</span>
            </div>
            
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                type="button"
                onClick={() => runTeamSimulation("accept_girmay")}
                className="py-1 px-1.5 border border-white/5 hover:bg-stone-800 text-[8px] text-left rounded text-stone-300 font-mono transition-all cursor-pointer"
              >
                🤝 Trigger Girmay Accept Invite
              </button>
              <button 
                type="button"
                onClick={() => runTeamSimulation("bulk_invite")}
                className="py-1 px-1.5 border border-white/5 hover:bg-stone-800 text-[8px] text-left rounded text-stone-300 font-mono transition-all cursor-pointer"
              >
                ⚡ Bulk Load Regional Specialists
              </button>
              <button 
                type="button"
                onClick={() => runTeamSimulation("clear_all")}
                className="py-1 px-1.5 border border-white/5 hover:bg-[#3d1212]/30 hover:border-red-500/20 text-[8px] text-left col-span-2 rounded text-stone-300 font-mono transition-all cursor-pointer"
              >
                🧹 Reset to System Default Owner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Developer Log Console */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-3 family-mono text-[8px]">
        <div className="flex justify-between items-center text-[7px] text-stone-500 tracking-wider uppercase mb-1.5 border-b border-white/5 pb-1">
          <span className="flex items-center gap-1 font-mono"><Database size={10} /> Active Logs Terminal</span>
          <button onClick={() => setDeveloperLogs([])} className="hover:text-white uppercase">Clear Console</button>
        </div>
        
        <div className="space-y-1 font-mono text-stone-400 select-all overflow-y-auto max-h-[85px] leading-relaxed">
          {developerLogs.length === 0 ? (
            <span className="text-stone-600 italic">No operations recorded yet. Use simulation buttons above.</span>
          ) : (
            developerLogs.map((log, index) => (
              <p key={index} className={log.includes("Error") ? "text-rose-400/90" : log.includes("Success") ? "text-green-400/90" : "text-stone-400"}>
                {log}
              </p>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
