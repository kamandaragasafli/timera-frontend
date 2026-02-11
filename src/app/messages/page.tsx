'use client';

import { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Loader2, 
  Send, 
  MessageCircle, 
  Inbox, 
  RefreshCw, 
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Facebook,
  Instagram,
  Archive,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  RotateCw,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { socialAccountsAPI, metaPermissionsAPI } from '@/lib/api';

type Platform = 'facebook' | 'instagram';
type Status = 'unread' | 'pending' | 'replied' | 'archived';
type MessageStatus = 'sending' | 'sent' | 'failed';

interface ConnectedAccount {
  id: string;
  platform: Platform;
  name: string;
  username?: string;
  isWebhookActive: boolean;
  page_id?: string;
  ig_account_id?: string;
  settings?: {
    page_id?: string;
    ig_account_id?: string;
  };
}

interface Conversation {
  id: string;
  senderName: string;
  preview: string;
  platform: Platform;
  accountId: string;
  unreadCount: number;
  lastMessageTime: string;
  status: Status;
  hasAttachment: boolean;
}

interface Message {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
  hasAttachment?: boolean;
  messageStatus?: MessageStatus;
  isDemo?: boolean;
}

// Demo connected accounts
const demoAccounts: ConnectedAccount[] = [
  {
    id: 'fb-page-1',
    platform: 'facebook',
    name: 'My Business Page',
    username: undefined,
    isWebhookActive: true,
  },
  {
    id: 'ig-acc-1',
    platform: 'instagram',
    name: 'Instagram Business',
    username: '@mybusiness',
    isWebhookActive: true,
  },
];

// Demo conversations - hər platform üçün 1 dialoq
const generateDemoConversations = (language: 'eng' | 'aze' | 'rus'): Conversation[] => {
  const timeLabels = {
    eng: {
      yesterday: 'Yesterday',
      hourAgo: (n: number) => `${n} hour${n > 1 ? 's' : ''} ago`,
      dayAgo: (n: number) => `${n} day${n > 1 ? 's' : ''} ago`,
    },
    aze: {
      yesterday: 'Dünən',
      hourAgo: (n: number) => `${n} saat əvvəl`,
      dayAgo: (n: number) => `${n} gün əvvəl`,
    },
    rus: {
      yesterday: 'Вчера',
      hourAgo: (n: number) => `${n} час${n > 1 && n < 5 ? 'а' : n >= 5 ? 'ов' : ''} назад`,
      dayAgo: (n: number) => `${n} дн${n === 1 ? 'я' : n < 5 ? 'ей' : 'ей'} назад`,
    },
  };

  const labels = timeLabels[language];

  return [
    {
      id: 'conv-1',
      senderName: 'John Smith',
      preview: language === 'eng' 
        ? 'Hi, can you provide information about the product?'
        : language === 'rus'
        ? 'Привет, можете предоставить информацию о продукте?'
        : 'Salam, məhsul haqqında məlumat verə bilərsiniz?',
      platform: 'facebook',
      accountId: 'fb-page-1',
      unreadCount: 2,
      lastMessageTime: '10:24',
      status: 'unread',
      hasAttachment: false,
    },
    {
      id: 'conv-2',
      senderName: 'Sarah Johnson',
      preview: language === 'eng'
        ? 'Is the discount code still valid?'
        : language === 'rus'
        ? 'Действителен ли еще код скидки?'
        : 'Endirim kodu hələ də keçərlidir?',
      platform: 'instagram',
      accountId: 'ig-acc-1',
      unreadCount: 0,
      lastMessageTime: labels.yesterday,
      status: 'replied',
      hasAttachment: true,
    },
  ];
};

export default function MessagesPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('instagram');
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');
  const [sortBy, setSortBy] = useState<'time' | 'unread' | 'name'>('unread');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [messageSending, setMessageSending] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [allConnectedAccounts, setAllConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const { language } = useLanguage();

  const isEng = language === 'eng';
  const isRus = language === 'rus';

  // Load connected accounts
  useEffect(() => {
    loadConnectedAccounts();
  }, []);

  const loadConnectedAccounts = async () => {
    try {
      const response = await socialAccountsAPI.getAccounts();
      const accounts = response.data.results || response.data || [];
      const metaAccounts: ConnectedAccount[] = accounts
        .filter((acc: any) => (acc.platform === 'facebook' || acc.platform === 'instagram') && acc.is_active)
        .map((acc: any) => ({
          id: acc.id,
          platform: acc.platform as Platform,
          name: acc.display_name || acc.platform_username || acc.platform,
          username: acc.platform_username,
          isWebhookActive: true, // Assume active if connected
          page_id: acc.settings?.page_id,
          ig_account_id: acc.settings?.ig_account_id,
          settings: acc.settings,
        }));
      setAllConnectedAccounts(metaAccounts);
    } catch (error) {
      console.error('Failed to load connected accounts:', error);
    }
  };

  // Get connected accounts for selected platform
  const connectedAccounts = useMemo(
    () => {
      if (demoMode) {
        return demoAccounts.filter((acc) => acc.platform === selectedPlatform);
      }
      return allConnectedAccounts.filter((acc) => acc.platform === selectedPlatform);
    },
    [selectedPlatform, demoMode, allConnectedAccounts]
  );

  // Auto-select first account when platform changes
  useEffect(() => {
    if (connectedAccounts.length > 0 && !selectedAccountId) {
      setSelectedAccountId(connectedAccounts[0].id);
    }
  }, [connectedAccounts, selectedAccountId]);

  const selectedAccount = connectedAccounts.find((acc) => acc.id === selectedAccountId);

  // Load conversations when account is selected
  useEffect(() => {
    if (selectedAccountId && selectedAccount && !demoMode) {
      loadConversations();
    } else if (demoMode) {
      setConversations(generateDemoConversations(language));
    } else {
      setConversations([]);
    }
  }, [selectedAccountId, selectedAccount, demoMode, language]);

  // Auto-refresh conversations every 15 seconds
  useEffect(() => {
    if (!selectedAccountId || !selectedAccount || demoMode) return;

    const interval = setInterval(() => {
      loadConversations();
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [selectedAccountId, selectedAccount, demoMode]);

  // Auto-refresh messages when conversation is selected
  useEffect(() => {
    if (!selectedConversationId || !selectedAccount || demoMode) return;

    const interval = setInterval(() => {
      loadMessages();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [selectedConversationId, selectedAccount, demoMode]);

  const loadConversations = async (silent = false) => {
    if (!selectedAccount) return;
    
    if (!silent) {
      setLoadingConversations(true);
    }
    try {
      if (selectedPlatform === 'instagram' && selectedAccount.ig_account_id) {
        const response = await metaPermissionsAPI.getInstagramConversations({
          account_id: selectedAccount.ig_account_id,
          limit: 50,
        });
        if (response.data.success) {
          const convs = response.data.conversations.map((conv: any) => {
            const participants = conv.participants?.data || [];
            const sender = participants.find((p: any) => p.id !== selectedAccount.ig_account_id) || participants[0];
            return {
              id: conv.id,
              senderName: sender?.username || sender?.name || 'Unknown',
              preview: conv.snippet || '',
              platform: 'instagram' as Platform,
              accountId: selectedAccountId,
              unreadCount: conv.unread_count || 0,
              lastMessageTime: new Date(conv.updated_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              status: (conv.unread_count > 0 ? 'unread' : 'replied') as Status,
              hasAttachment: false,
            };
          });
          setConversations(convs);
        }
      } else if (selectedPlatform === 'facebook' && selectedAccount.page_id) {
        const response = await metaPermissionsAPI.getFacebookConversations({
          page_id: selectedAccount.page_id,
          limit: 50,
        });
        if (response.data.success) {
          const convs = response.data.conversations.map((conv: any) => {
            const participants = conv.participants?.data || [];
            const sender = participants.find((p: any) => p.id !== selectedAccount.page_id) || participants[0];
            return {
              id: conv.id,
              senderName: sender?.name || 'Unknown',
              preview: conv.snippet || '',
              platform: 'facebook' as Platform,
              accountId: selectedAccountId,
              unreadCount: conv.unread_count || 0,
              lastMessageTime: new Date(conv.updated_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              status: (conv.unread_count > 0 ? 'unread' : 'replied') as Status,
              hasAttachment: false,
            };
          });
          setConversations(convs);
        }
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
      if (!silent) {
        setConversations([]);
      }
    } finally {
      if (!silent) {
        setLoadingConversations(false);
      }
    }
  };

  const allConversations = useMemo(() => {
    return conversations;
  }, [conversations]);
  
  // Filter and sort conversations
  const filteredConversations = useMemo(() => {
    let filtered = allConversations.filter((conv) => {
      const matchesSearch = 
        conv.senderName.toLowerCase().includes(search.toLowerCase()) ||
        conv.preview.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = conv.platform === selectedPlatform;
      const matchesAccount = !selectedAccountId || conv.accountId === selectedAccountId;
      const matchesStatus = selectedStatus === 'all' || conv.status === selectedStatus;
      
      return matchesSearch && matchesPlatform && matchesAccount && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'unread') {
        if (a.status === 'unread' && b.status !== 'unread') return -1;
        if (a.status !== 'unread' && b.status === 'unread') return 1;
        return b.unreadCount - a.unreadCount;
      } else if (sortBy === 'time') {
        return 0;
      } else {
        return a.senderName.localeCompare(b.senderName);
      }
    });

    return filtered;
  }, [allConversations, search, selectedPlatform, selectedAccountId, selectedStatus, sortBy]);

  const [messages, setMessages] = useState<Message[]>([]);

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversationId && !demoMode && selectedAccount) {
      loadMessages();
    } else if (demoMode && selectedConversationId) {
      const demoMessages: Message[] = language === 'eng' 
        ? [
            {
              id: 'm1',
              fromMe: false,
              text: 'Hi, can you provide information about the product?',
              time: '10:22',
              isDemo: true,
            },
            {
              id: 'm2',
              fromMe: true,
              text: 'Hi! Of course, which product are you interested in?',
              time: '10:23',
              messageStatus: 'sent',
              isDemo: true,
            },
          ]
        : language === 'rus'
        ? [
            {
              id: 'm1',
              fromMe: false,
              text: 'Привет, можете предоставить информацию о продукте?',
              time: '10:22',
              isDemo: true,
            },
            {
              id: 'm2',
              fromMe: true,
              text: 'Привет! Конечно, какой продукт вас интересует?',
              time: '10:23',
              messageStatus: 'sent',
              isDemo: true,
            },
          ]
        : [
            {
              id: 'm1',
              fromMe: false,
              text: 'Salam, məhsul haqqında məlumat verə bilərsiniz?',
              time: '10:22',
              isDemo: true,
            },
            {
              id: 'm2',
              fromMe: true,
              text: 'Salam! Əlbəttə, hansı məhsul sizi maraqlandırır?',
              time: '10:23',
              messageStatus: 'sent',
              isDemo: true,
            },
          ];
      setMessages(demoMessages);
    } else {
      setMessages([]);
    }
  }, [selectedConversationId, demoMode, language, selectedAccount]);

  const loadMessages = async (silent = false) => {
    if (!selectedConversationId || !selectedAccount) return;
    
    try {
      if (selectedPlatform === 'instagram') {
        const response = await metaPermissionsAPI.getInstagramMessages(selectedConversationId, { limit: 50 });
        if (response.data.success) {
          const msgs = response.data.messages.map((msg: any) => ({
            id: msg.id,
            fromMe: msg.from?.id === selectedAccount.ig_account_id,
            text: msg.message || '',
            time: new Date(msg.created_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            hasAttachment: !!msg.attachments,
            messageStatus: 'sent' as MessageStatus,
          }));
          setMessages(msgs.reverse()); // Reverse to show oldest first
        }
      } else if (selectedPlatform === 'facebook') {
        const response = await metaPermissionsAPI.getFacebookMessages(selectedConversationId, { limit: 50 });
        if (response.data.success) {
          const msgs = response.data.messages.map((msg: any) => ({
            id: msg.id,
            fromMe: msg.from?.id === selectedAccount.page_id,
            text: msg.message || '',
            time: new Date(msg.created_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            hasAttachment: !!msg.attachments,
            messageStatus: 'sent' as MessageStatus,
          }));
          setMessages(msgs.reverse()); // Reverse to show oldest first
        }
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
      if (!silent) {
        setMessages([]);
      }
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      if (selectedAccountId && selectedAccount && !demoMode) {
        await loadConversations();
        if (selectedConversationId) {
          await loadMessages();
        }
      }
      setLastSyncTime(new Date());
    } catch (e) {
      console.error('Sync failed:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversationId || !selectedAccount) return;
    
    setMessageSending(true);
    const tempMessage: Message = {
      id: `m-${Date.now()}`,
      fromMe: true,
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      messageStatus: 'sending',
      isDemo: demoMode,
    };

    setMessages((prev) => [...prev, tempMessage]);
    const messageText = newMessage;
    setNewMessage('');

    try {
      if (demoMode) {
        // Simulate API call for demo
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempMessage.id ? { ...msg, messageStatus: 'sent' as MessageStatus } : msg
          )
        );
      } else {
        // Real API call
        const selectedConv = conversations.find(c => c.id === selectedConversationId);
        if (selectedPlatform === 'instagram' && selectedAccount.ig_account_id && selectedConv) {
          // Get conversation details to find recipient
          try {
            const convResponse = await metaPermissionsAPI.getInstagramConversations({
              account_id: selectedAccount.ig_account_id,
              limit: 100,
            });
            const conv = convResponse.data.conversations?.find((c: any) => c.id === selectedConversationId);
            // Find recipient - participant that is not the account itself
            const participants = conv?.participants?.data || [];
            const recipientId = participants.find((p: any) => p.id !== selectedAccount.ig_account_id)?.id;
            
            if (recipientId) {
              await metaPermissionsAPI.sendInstagramMessage({
                account_id: selectedAccount.ig_account_id,
                recipient_id: recipientId,
                message: messageText,
              });
              // Reload messages after sending
              setTimeout(() => loadMessages(), 500);
            } else {
              throw new Error('Recipient ID not found');
            }
          } catch (err) {
            console.error('Failed to send Instagram message:', err);
            throw err;
          }
        } else if (selectedPlatform === 'facebook' && selectedAccount.page_id && selectedConv) {
          // Get conversation details to find recipient
          try {
            const convResponse = await metaPermissionsAPI.getFacebookConversations({
              page_id: selectedAccount.page_id,
              limit: 100,
            });
            const conv = convResponse.data.conversations?.find((c: any) => c.id === selectedConversationId);
            // Find recipient - participant that is not the page itself
            const participants = conv?.participants?.data || [];
            const recipientId = participants.find((p: any) => p.id !== selectedAccount.page_id)?.id;
            
            if (recipientId) {
              await metaPermissionsAPI.sendFacebookMessage({
                page_id: selectedAccount.page_id,
                recipient_id: recipientId,
                message: messageText,
              });
              // Reload messages after sending
              setTimeout(() => loadMessages(), 500);
            } else {
              throw new Error('Recipient ID not found');
            }
          } catch (err) {
            console.error('Failed to send Facebook message:', err);
            throw err;
          }
        }
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempMessage.id ? { ...msg, messageStatus: 'sent' as MessageStatus } : msg
          )
        );
      }
      setMessageSending(false);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, messageStatus: 'failed' as MessageStatus } : msg
        )
      );
      setMessageSending(false);
    }
  };

  const handleRetryMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, messageStatus: 'sending' as MessageStatus } : msg
      )
    );

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, messageStatus: 'sent' as MessageStatus } : msg
        )
      );
    }, 1000);
  };

  const handleMarkAsRead = () => {
    if (!selectedConversationId) return;
    // await messagesAPI.markAsRead(selectedConversationId);
    console.log('Mark as read:', selectedConversationId);
  };

  const handleMarkAsUnread = () => {
    if (!selectedConversationId) return;
    // await messagesAPI.markAsUnread(selectedConversationId);
    console.log('Mark as unread:', selectedConversationId);
  };

  const handleArchive = () => {
    if (!selectedConversationId) return;
    // await messagesAPI.archive(selectedConversationId);
    console.log('Archive:', selectedConversationId);
  };

  const selectedConversation = allConversations.find((c) => c.id === selectedConversationId);

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'facebook': 
        return <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />;
      case 'instagram': 
        return <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />;
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'unread': return <AlertCircle className="w-3.5 h-3.5 text-red-500" />;
      case 'pending': return <Clock className="w-3.5 h-3.5 text-yellow-500" />;
      case 'replied': return <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />;
      case 'archived': return <Inbox className="w-3.5 h-3.5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Status) => {
    const variants = {
      unread: { variant: 'destructive' as const },
      pending: { variant: 'default' as const },
      replied: { variant: 'secondary' as const },
      archived: { variant: 'outline' as const },
    };

    const labelsAz: Record<Status, string> = {
      unread: 'Oxunmamış',
      pending: 'Gözləyir',
      replied: 'Cavablandırılıb',
      archived: 'Arxiv',
    };

    const labelsEn: Record<Status, string> = {
      unread: 'Unread',
      pending: 'Pending',
      replied: 'Replied',
      archived: 'Archived',
    };

    const labelsRu: Record<Status, string> = {
      unread: 'Непрочитано',
      pending: 'В ожидании',
      replied: 'Отвечено',
      archived: 'Архив',
    };

    const labels = isEng ? labelsEn : isRus ? labelsRu : labelsAz;

    return (
      <Badge variant={variants[status].variant} className="text-[10px] px-1.5 py-0">
        {labels[status]}
      </Badge>
    );
  };

  const stats = useMemo(() => {
    const unread = filteredConversations.filter(c => c.status === 'unread').length;
    const pending = filteredConversations.filter(c => c.status === 'pending').length;
    const total = filteredConversations.length;
    return { unread, pending, total };
  }, [filteredConversations]);

  const formatLastSync = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSyncTime.getTime()) / 1000);
    
    if (diff < 60) return isEng ? 'Just now' : isRus ? 'Только что' : 'İndicə';
    if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      return isEng ? `${mins} min ago` : isRus ? `${mins} мин назад` : `${mins} dəq əvvəl`;
    }
    return lastSyncTime.toLocaleString();
  };

  return (
    <DashboardLayout
      title={isEng ? "Messages & Inbox" : isRus ? "Сообщения и контакты" : "Mesajlar & Əlaqə"}
      description={
        isEng
          ? "Monitor and reply to customer messages (Instagram, Facebook) from a single screen."
          : isRus
          ? "Отслеживайте и отвечайте на сообщения клиентов (Instagram, Facebook) с одного экрана."
          : "Müştəri mesajlarını (Instagram, Facebook) tək ekrandan izləyin və cavablayın."
      }
    >
      <div className="flex flex-col min-h-[calc(100vh-140px)] gap-4">
        {/* Channel Selector & Stats */}
        <Card>
          <CardHeader className="space-y-3 pb-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {isEng
                    ? "Messages & Inbox Center"
                    : isRus
                    ? "Центр сообщений"
                    : "Mesajlar & Əlaqə Mərkəzi"}
                </CardTitle>
                <CardDescription className="mt-1">
                  {isEng
                    ? `Total: ${stats.total} | Unread: ${stats.unread} | Pending: ${stats.pending}`
                    : isRus
                    ? `Всего: ${stats.total} | Непрочитано: ${stats.unread} | В ожидании: ${stats.pending}`
                    : `Ümumi: ${stats.total} | Oxunmamış: ${stats.unread} | Gözləyir: ${stats.pending}`}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSync}
                  disabled={isSyncing}
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isEng ? "Syncing..." : isRus ? "Синхронизация..." : "Sinxronlaşır..."}
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {isEng ? "Sync" : isRus ? "Синхр" : "Sinx"}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Platform & Account Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Platform Tabs */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {isEng ? 'Channel' : isRus ? 'Канал' : 'Kanal'}
                </label>
                <Tabs value={selectedPlatform} onValueChange={(v) => {
                  setSelectedPlatform(v as Platform);
                  setSelectedAccountId('');
                  setSelectedConversationId(null);
                }}>
                  <TabsList className="grid w-full grid-cols-2 h-9">
                    <TabsTrigger value="instagram" className="text-xs">
                      <Instagram className="w-3.5 h-3.5 mr-1.5 text-[#E4405F]" />
                      Instagram
                    </TabsTrigger>
                    <TabsTrigger value="facebook" className="text-xs">
                      <Facebook className="w-3.5 h-3.5 mr-1.5 text-[#1877F2]" />
                      Facebook
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Account Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {isEng ? 'Connected Account' : isRus ? 'Подключенный аккаунт' : 'Bağlı hesab'}
                </label>
                <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue 
                      placeholder={
                        isEng ? 'Select account...' : isRus ? 'Выберите аккаунт...' : 'Hesab seçin...'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {connectedAccounts.length === 0 ? (
                      <SelectItem value="none" disabled>
                        {isEng ? 'No connected accounts' : isRus ? 'Нет подключенных аккаунтов' : 'Bağlı hesab yoxdur'}
                      </SelectItem>
                    ) : (
                      connectedAccounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          <div className="flex items-center gap-2">
                            <span>{acc.username || acc.name}</span>
                            {demoMode && (
                              <Badge variant="outline" className="text-[9px] px-1 py-0">Demo</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Webhook Status & Last Sync */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t">
              <div className="flex items-center gap-2 text-xs">
                {selectedAccount ? (
                  <>
                    {selectedAccount.isWebhookActive ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {isEng ? 'Connected' : isRus ? 'Подключено' : 'Bağlıdır'}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {isEng ? 'Webhook Active' : isRus ? 'Webhook активен' : 'Webhook Aktivdir'}
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-orange-600 dark:text-orange-400">
                          {isEng ? 'Not Subscribed' : isRus ? 'Не подписано' : 'Abunə deyil'}
                        </span>
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          {isEng ? 'Resubscribe' : isRus ? 'Переподписать' : 'Yenidən abunə ol'}
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-muted-foreground">
                    {isEng ? 'Select an account' : isRus ? 'Выберите аккаунт' : 'Hesab seçin'}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {isEng ? 'Last sync:' : isRus ? 'Последняя синхр:' : 'Son sinxron:'} {formatLastSync()}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Demo Mode Toggle */}
            <div className="flex items-center justify-between p-3 border rounded-lg bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <Label htmlFor="demo-mode" className="text-sm font-medium cursor-pointer">
                  {isEng ? 'Demo Mode' : isRus ? 'Демо режим' : 'Demo Rejimi'}
                </Label>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                  {isEng ? 'Optional' : isRus ? 'Опционально' : 'İstəyə bağlı'}
                </Badge>
              </div>
              <Switch
                id="demo-mode"
                checked={demoMode}
                onCheckedChange={setDemoMode}
              />
            </div>

            {demoMode && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {isEng
                    ? '⚠️ Demo data — not from Meta. Real messages from your connected Instagram and Facebook accounts will appear when demo mode is disabled.'
                    : isRus
                    ? '⚠️ Демо данные — не из Meta. Реальные сообщения из ваших подключенных аккаунтов Instagram и Facebook будут отображаться при отключении демо режима.'
                    : '⚠️ Demo məlumat — Meta-dan deyil. Bağlı Instagram və Facebook hesablarınızdan real mesajlar demo rejimi söndürüldükdə görünəcək.'}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-1 gap-4 min-h-0 flex-col md:flex-row">
          {/* Sol panel – dialoqlar siyahısı */}
          <Card className="w-full md:w-96 flex flex-col">
            <CardHeader className="pb-3 space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={
                    isEng
                      ? "Search..."
                      : isRus
                      ? "Поиск..."
                      : "Axtar..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 pl-8 text-xs"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                <Select value={selectedStatus} onValueChange={(v) => {
                  setSelectedStatus(v as Status | 'all');
                }}>
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <Filter className="w-3 h-3 mr-1" />
                    <SelectValue
                      placeholder={isEng ? "Status" : isRus ? "Статус" : "Status"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {isEng ? "All statuses" : isRus ? "Все статусы" : "Bütün statuslar"}
                    </SelectItem>
                    <SelectItem value="unread">
                      {isEng ? "Unread" : isRus ? "Непрочитано" : "Oxunmamış"}
                    </SelectItem>
                    <SelectItem value="pending">
                      {isEng ? "Pending" : isRus ? "В ожидании" : "Gözləyir"}
                    </SelectItem>
                    <SelectItem value="replied">
                      {isEng ? "Replied" : isRus ? "Отвечено" : "Cavablandırılıb"}
                    </SelectItem>
                    <SelectItem value="archived">
                      {isEng ? "Archived" : isRus ? "Архив" : "Arxiv"}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(v) => {
                  setSortBy(v as 'time' | 'unread' | 'name');
                }}>
                  <SelectTrigger className="h-8 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unread">
                      {isEng ? "Unread first" : isRus ? "Сначала непрочитанные" : "Oxunmamış ilk"}
                    </SelectItem>
                    <SelectItem value="time">
                      {isEng ? "By time" : isRus ? "По времени" : "Tarixə görə"}
                    </SelectItem>
                    <SelectItem value="name">
                      {isEng ? "By name" : isRus ? "По имени" : "Ada görə"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {isEng
                    ? `${filteredConversations.length} thread(s)`
                    : isRus
                    ? `${filteredConversations.length} диалог(ов)`
                    : `${filteredConversations.length} dialoq`}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0">
              <div className="h-full overflow-y-auto">
                {loadingConversations ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
                    {isEng
                      ? "Loading conversations..."
                      : isRus
                      ? "Загрузка диалогов..."
                      : "Dialoqlar yüklənir..."}
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    {isEng
                      ? "No conversations found."
                      : isRus
                      ? "Диалоги не найдены."
                      : "Dialoq tapılmadı."}
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {filteredConversations.map((conv) => (
                      <button
                        key={conv.id}
                        type="button"
                        onClick={() => setSelectedConversationId(conv.id)}
                        className={`w-full text-left px-3 py-2.5 border-b border-border hover:bg-muted/60 transition ${
                          selectedConversationId === conv.id ? 'bg-muted border-l-2 border-l-primary' : ''
                        } ${conv.status === 'unread' ? 'font-medium' : ''}`}
                      >
                        <div className="flex items-start justify-between mb-1 gap-2">
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            {getPlatformIcon(conv.platform)}
                            <span className="text-sm truncate">{conv.senderName}</span>
                            {conv.hasAttachment && (
                              <span className="text-[10px] text-muted-foreground">📎</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {getStatusIcon(conv.status)}
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                              {conv.lastMessageTime}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-muted-foreground truncate flex-1">
                            {conv.preview}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            {getStatusBadge(conv.status)}
                            {conv.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-[10px] px-1.5 py-0 min-w-[18px]">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sağ panel – seçilmiş dialoq */}
          <Card className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b border-border flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="shrink-0">
                      {getPlatformIcon(selectedConversation.platform)}
                    </div>
                    <div>
                      <CardTitle className="text-sm">{selectedConversation.senderName}</CardTitle>
                      <CardDescription className="text-xs">
                        {selectedConversation.platform === 'facebook' &&
                          (isEng ? 'Facebook Page Message' : isRus ? 'Сообщение страницы Facebook' : 'Facebook Səhifə Mesajı')}
                        {selectedConversation.platform === 'instagram' &&
                          (isEng ? 'Instagram DM' : isRus ? 'Instagram DM' : 'Instagram DM')}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMarkAsRead}
                      title={isEng ? 'Mark as read' : isRus ? 'Отметить прочитанным' : 'Oxunmuş kimi işarələ'}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleMarkAsUnread}
                      title={isEng ? 'Mark as unread' : isRus ? 'Отметить непрочитанным' : 'Oxunmamış kimi işarələ'}
                    >
                      <EyeOff className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleArchive}
                      title={isEng ? 'Archive' : isRus ? 'Архивировать' : 'Arxivlə'}
                    >
                      <Archive className="w-4 h-4" />
                    </Button>
                    {getStatusBadge(selectedConversation.status)}
                    {demoMode && (
                      <Badge variant="outline" className="text-[10px] px-2 py-0">
                        Demo
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  <div className="flex-1 px-4 py-3 overflow-y-auto">
                    <div className="space-y-2">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                              msg.fromMe
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <div>{msg.text}</div>
                            <div className={`mt-1 text-[10px] opacity-70 flex items-center gap-1 ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
                              <span>{msg.time}</span>
                              {msg.fromMe && msg.messageStatus && (
                                <>
                                  {msg.messageStatus === 'sending' && (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  )}
                                  {msg.messageStatus === 'sent' && (
                                    <>
                                      <CheckCircle2 className="w-3 h-3" />
                                      {msg.isDemo && demoMode && (
                                        <span className="ml-1">(Demo)</span>
                                      )}
                                    </>
                                  )}
                                  {msg.messageStatus === 'failed' && (
                                    <>
                                      <AlertCircle className="w-3 h-3 text-red-400" />
                                      <Button
                                        variant="link"
                                        size="sm"
                                        className="h-auto p-0 text-[10px] underline ml-1"
                                        onClick={() => handleRetryMessage(msg.id)}
                                      >
                                        {isEng ? 'Retry' : isRus ? 'Повторить' : 'Yenidən'}
                                      </Button>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border p-3 flex items-end gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder={
                        isEng
                          ? 'Type your reply...'
                          : isRus
                          ? 'Напишите ответ...'
                          : 'Cavab yazın...'
                      }
                      className="min-h-[60px] max-h-[120px] text-sm resize-none flex-1"
                      disabled={messageSending}
                    />
                    <Button
                      size="icon"
                      className="shrink-0 h-[60px] w-[60px]"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || messageSending}
                    >
                      {messageSending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex-1 flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
                <MessageCircle className="w-12 h-12 mb-3 text-muted-foreground opacity-50" />
                <p className="mb-1 font-medium">
                  {isEng ? 'Select a conversation' : isRus ? 'Выберите диалог' : 'Dialoq seçin'}
                </p>
                <p className="text-xs max-w-sm">
                  {isEng
                    ? 'Select a conversation on the left to start messaging.'
                    : isRus
                    ? 'Выберите диалог слева, чтобы начать переписку.'
                    : 'Soldan bir dialoq seçin və mesajlaşmaya başlayın.'}
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
