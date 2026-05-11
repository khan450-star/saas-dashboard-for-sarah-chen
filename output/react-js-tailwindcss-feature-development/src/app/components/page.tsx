'use client';

import { useState } from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Notification from '@/components/ui/Notification';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Card from '@/components/ui/Card';

export default function ComponentsPage() {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: string, type: 'success' | 'error' | 'info' | 'warning', message: string}>>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const addNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      addNotification('success', 'Form submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">UI Components</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A showcase of reusable UI components built with React, TypeScript, and Tailwind CSS.
        </p>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>

      {/* Buttons Section */}
      <Card title="Buttons">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" loading>Loading...</Button>
          </div>
        </div>
      </Card>

      {/* Form Elements */}
      <Card title="Form Elements">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
          <div>
            <label className="label">Message</label>
            <textarea
              className="input resize-none"
              rows={4}
              placeholder="Enter your message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
            />
          </div>
          <Button type="submit" variant="primary" loading={loading}>
            {loading ? 'Submitting...' : 'Submit Form'}
          </Button>
        </form>
      </Card>

      {/* Notifications Section */}
      <Card title="Notifications">
        <div className="space-y-4">
          <p className="text-gray-600">Click the buttons below to trigger different notification types:</p>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="outline" 
              onClick={() => addNotification('success', 'Success! Operation completed.')}
            >
              <Check className="w-4 h-4 mr-2" />
              Success
            </Button>
            <Button 
              variant="outline" 
              onClick={() => addNotification('error', 'Error! Something went wrong.')}
            >
              <X className="w-4 h-4 mr-2" />
              Error
            </Button>
            <Button 
              variant="outline" 
              onClick={() => addNotification('warning', 'Warning! Please check your input.')}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Warning
            </Button>
            <Button 
              variant="outline" 
              onClick={() => addNotification('info', 'Info: Here is some helpful information.')}
            >
              <Info className="w-4 h-4 mr-2" />
              Info
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal Section */}
      <Card title="Modal">
        <div className="space-y-4">
          <p className="text-gray-600">Click the button below to open a modal dialog:</p>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Open Modal
          </Button>
        </div>
      </Card>

      {/* Loading States */}
      <Card title="Loading States">
        <div className="space-y-4">
          <p className="text-gray-600">Different loading spinner sizes:</p>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <LoadingSpinner size="sm" />
              <div className="text-sm text-gray-500 mt-2">Small</div>
            </div>
            <div className="text-center">
              <LoadingSpinner size="md" />
              <div className="text-sm text-gray-500 mt-2">Medium</div>
            </div>
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <div className="text-sm text-gray-500 mt-2">Large</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal Component */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Example Modal"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            This is an example modal dialog. It can contain any content and is fully accessible
            with keyboard navigation and focus management.
          </p>
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={() => {
                setShowModal(false);
                addNotification('success', 'Modal action completed!');
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}