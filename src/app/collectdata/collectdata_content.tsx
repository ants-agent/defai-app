'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useLogin, usePrivy, useWallets } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

console.log('Dialog component:', Dialog);

export const CollectDataPage = () => {
  const { login, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const [isLoading, setIsLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    console.log('CollectDataPage mounted');
  }, []);

  useEffect(() => {
    console.log('showTerms changed:', showTerms);
  }, [showTerms]);

  console.log('acceptedTerms', acceptedTerms);
  console.log('authenticated', authenticated);


  const handleDataCollection = async () => {
    console.log("Button clicked, authenticated:", authenticated);

    if (!authenticated) {
      toast.error("Authentication Required", {
        description: "Please login first to share your data."
      });
      return;
    }

    setIsLoading(true);
    try {
      const twitterHandle = user?.twitter?.username;
      const publicKey = wallets[0]?.address;

      if (!twitterHandle || !publicKey) {
        toast.error("Missing Information", {
          description: "Please ensure you're connected with Twitter and have a wallet."
        });
        return;
      }

      const response = await fetch('/api/collect-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          twitterHandle,
          publicKey,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      toast.success("Success!", {
        description: "Thank you for sharing your data with us."
      });

    } catch (error) {
      console.error('Error collecting data:', error);
      toast.error("Error", {
        description: "Failed to collect data. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  //setShowTerms(true);
  console.log('isLoading', isLoading);

  console.log('Rendering with showTerms:', showTerms);

  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <Card className="max-w-2xl w-full p-8 space-y-6" asChild>
        <div>
          <h1 className="text-3xl font-bold text-center">
            Join Our Research Initiative
          </h1>
          
          <div className="space-y-4 text-center">
            <p className="text-lg text-muted-foreground">
              Help us improve our services by sharing your data with us.
            </p>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">What we collect:</h2>
              <ul className="list-disc list-inside text-left text-muted-foreground">
                <li>Your Twitter handle</li>
                <li>Your wallet public key</li>
                <li>Timestamp of data collection</li>
              </ul>
            </div>

            {!authenticated ? (
              <Button onClick={() => login()}>Login to Continue</Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    console.log('Share My Data clicked');
                    if (acceptedTerms) {
                      handleDataCollection();
                    } else {
                      console.log('Setting showTerms to true');
                      setShowTerms(true);
                    }
                  }}
                  className="w-full mt-4 relative z-10"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Share My Data"}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  By clicking "Share My Data", you agree to our{" "}
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Terms button clicked');
                      setShowTerms(true);
                    }}
                    className="text-primary hover:underline relative z-10"
                  >
                    data collection terms
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </Card>

      <Dialog 
        open={showTerms}
        onOpenChange={setShowTerms}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Data Collection Terms</DialogTitle>
            <DialogDescription>
              Please read and accept our data collection terms
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[300px] overflow-y-auto my-6 space-y-4">
            <h3 className="font-semibold">1. Data We Collect</h3>
            <p className="text-sm text-muted-foreground">
              We collect your Twitter handle and public wallet address to improve our services
              and provide a better user experience.
            </p>

            <h3 className="font-semibold">2. How We Use Your Data</h3>
            <p className="text-sm text-muted-foreground">
              Your data will be used for research purposes and to enhance our blockchain
              services. We never share your personal information with third parties.
            </p>

            <h3 className="font-semibold">3. Data Security</h3>
            <p className="text-sm text-muted-foreground">
              We implement appropriate security measures to protect your data against
              unauthorized access or disclosure.
            </p>

            <h3 className="font-semibold">4. Your Rights</h3>
            <p className="text-sm text-muted-foreground">
              You have the right to request access to, correction of, or deletion of your data
              at any time.
            </p>
          </div>

          <DialogFooter className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              />
              <label htmlFor="terms">
                I accept the terms and conditions
              </label>
            </div>
            <Button
              onClick={() => setShowTerms(false)}
              disabled={!acceptedTerms}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
