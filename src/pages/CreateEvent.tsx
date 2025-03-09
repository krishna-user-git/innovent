
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Upload, Check, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Basic details state
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventFormat, setEventFormat] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  
  // Banner image state
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Current tab state
  const [currentTab, setCurrentTab] = useState("basics");
  
  // Registration and team state
  const [registrationDeadline, setRegistrationDeadline] = useState<Date>();
  const [teamFormationDeadline, setTeamFormationDeadline] = useState<Date>();
  const [projectSubmissionDeadline, setProjectSubmissionDeadline] = useState<Date>();
  
  // Handle banner image selection
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (PNG, JPG, or GIF)",
          variant: "destructive",
        });
        return;
      }
      
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };
  
  // Handle next button click
  const handleNext = () => {
    // Validation for basic details
    if (currentTab === "basics") {
      if (!eventName || !eventType || !eventFormat || !startDate || !endDate || !description) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields before continuing",
          variant: "destructive",
        });
        return;
      }
      
      if (startDate > endDate) {
        toast({
          title: "Invalid date range",
          description: "End date must be after start date",
          variant: "destructive",
        });
        return;
      }
      
      // Move to next tab
      setCurrentTab("details");
    } else if (currentTab === "details") {
      setCurrentTab("registration");
    } else if (currentTab === "registration") {
      setCurrentTab("teams");
    }
  };
  
  // Handle save as draft
  const handleSaveAsDraft = async () => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to save an event",
          variant: "destructive",
        });
        return;
      }
      
      setIsUploading(true);
      
      // Upload banner image if selected
      let bannerUrl = null;
      if (banner) {
        const fileExt = banner.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('event-banners')
          .upload(filePath, banner);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL
        const { data } = supabase.storage
          .from('event-banners')
          .getPublicUrl(filePath);
          
        bannerUrl = data.publicUrl;
      }
      
      // Construct event data object
      const eventData = {
        name: eventName,
        type: eventType,
        format: eventFormat,
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
        tagline: tagline,
        description: description,
        banner_url: bannerUrl,
        user_id: user.id,
        status: "draft",
        created_at: new Date().toISOString(),
        registration_deadline: registrationDeadline?.toISOString(),
        team_formation_deadline: teamFormationDeadline?.toISOString(),
        project_submission_deadline: projectSubmissionDeadline?.toISOString(),
      };
      
      // Save to events table
      const { error, data } = await supabase
        .from('events')
        .insert(eventData)
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Draft saved!",
        description: "Your event has been saved as a draft",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast({
        title: "Failed to save draft",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle publish event
  const handlePublishEvent = async () => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to create an event",
          variant: "destructive",
        });
        return;
      }
      
      setIsUploading(true);
      
      // Upload banner image if selected
      let bannerUrl = null;
      if (banner) {
        const fileExt = banner.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('event-banners')
          .upload(filePath, banner);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL
        const { data } = supabase.storage
          .from('event-banners')
          .getPublicUrl(filePath);
          
        bannerUrl = data.publicUrl;
      }
      
      // Construct event data object
      const eventData = {
        name: eventName,
        type: eventType,
        format: eventFormat,
        start_date: startDate?.toISOString(),
        end_date: endDate?.toISOString(),
        tagline: tagline,
        description: description,
        banner_url: bannerUrl,
        user_id: user.id,
        status: "published",
        created_at: new Date().toISOString(),
        registration_deadline: registrationDeadline?.toISOString(),
        team_formation_deadline: teamFormationDeadline?.toISOString(),
        project_submission_deadline: projectSubmissionDeadline?.toISOString(),
      };
      
      // Save to events table
      const { error, data } = await supabase
        .from('events')
        .insert(eventData)
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Event published!",
        description: "Your event has been published successfully",
      });
      
      navigate("/events");
    } catch (error) {
      console.error("Error publishing event:", error);
      toast({
        title: "Failed to create event",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  // Add custom registration question
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [newCustomQuestion, setNewCustomQuestion] = useState("");
  
  const addCustomQuestion = () => {
    if (newCustomQuestion.trim()) {
      setCustomQuestions([...customQuestions, newCustomQuestion.trim()]);
      setNewCustomQuestion("");
      
      // Show confirmation toast
      toast({
        title: "Question added",
        description: "Custom question has been added to registration form",
      });
    }
  };
  
  return (
    <Layout>
      <div className="container py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Create Your Event</h1>
          <p className="text-gray-400 mb-8">Fill out the details below to create your event</p>
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="basics" className="data-[state=active]:bg-gray-700">Basics</TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:bg-gray-700">Details</TabsTrigger>
              <TabsTrigger value="registration" className="data-[state=active]:bg-gray-700">Registration</TabsTrigger>
              <TabsTrigger value="teams" className="data-[state=active]:bg-gray-700">Teams</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input 
                        id="eventName" 
                        placeholder="e.g., Cloud Innovation Hackathon"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="bg-gray-700 border-gray-600"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Event Type</Label>
                        <Select value={eventType} onValueChange={setEventType}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="hackathon">Hackathon</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="meetup">Meetup</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Format</Label>
                        <Select value={eventFormat} onValueChange={setEventFormat}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="in-person">In-person</SelectItem>
                            <SelectItem value="virtual">Virtual</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal bg-gray-700 border-gray-600",
                                !startDate && "text-gray-400"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : "Select start date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                              className="bg-gray-700"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal bg-gray-700 border-gray-600",
                                !endDate && "text-gray-400"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "PPP") : "Select end date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                              className="bg-gray-700"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input 
                        id="tagline" 
                        placeholder="A short, catchy description of your event"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        className="bg-gray-700 border-gray-600"
                      />
                      <p className="text-sm text-gray-400">This will appear on your event card and landing page.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your event in detail..." 
                        className="min-h-32 bg-gray-700 border-gray-600"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Event Banner</Label>
                      <div 
                        className={cn(
                          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                          bannerPreview ? "border-gold" : "border-gray-600 hover:border-gold/50"
                        )}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {bannerPreview ? (
                          <div className="flex flex-col items-center">
                            <img 
                              src={bannerPreview} 
                              alt="Banner preview" 
                              className="max-h-48 object-contain mb-2 rounded"
                            />
                            <p className="text-sm text-gray-400">Click to change image</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="mb-1 font-medium">Upload an image</p>
                            <p className="text-xs text-gray-400 mb-3">PNG, JPG or GIF, max 5MB</p>
                            <Button size="sm" className="bg-gold hover:bg-gold/90 text-gray-900">Choose File</Button>
                          </div>
                        )}
                        
                        <input 
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleBannerChange}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button onClick={handleNext} className="bg-gold hover:bg-gold/90 text-gray-900">Next</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website URL (Optional)</Label>
                      <Input id="website" placeholder="https://yourevent.com" className="bg-gray-700 border-gray-600" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Location Type</Label>
                        <Select>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select location type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="venue">Physical Venue</SelectItem>
                            <SelectItem value="virtual">Virtual Platform</SelectItem>
                            <SelectItem value="hybrid">Both (Hybrid)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location Details</Label>
                        <Input id="location" placeholder="Address or virtual platform link" className="bg-gray-700 border-gray-600" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Event Categories (select up to 3)</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {["AI & Machine Learning", "Web Development", "Mobile", "Cloud", "Blockchain", "IoT", "Data Science", "AR/VR", "Gaming", "Social Impact", "Health", "Education"].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Switch id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`} className="data-[state=checked]:bg-gold" />
                            <Label htmlFor={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="prizes">Prizes (Optional)</Label>
                      <Textarea id="prizes" placeholder="Describe the prizes for winners..." className="bg-gray-700 border-gray-600" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sponsors">Sponsors (Optional)</Label>
                      <Textarea id="sponsors" placeholder="List your event sponsors..." className="bg-gray-700 border-gray-600" />
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button onClick={handleNext} className="bg-gold hover:bg-gold/90 text-gray-900">Next</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="registration" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Registration Type</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue placeholder="Select registration type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="open">Open Registration</SelectItem>
                          <SelectItem value="approval">Approval Required</SelectItem>
                          <SelectItem value="invite">Invite Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="maxParticipants">Maximum Participants</Label>
                        <Input id="maxParticipants" type="number" placeholder="e.g., 100" className="bg-gray-700 border-gray-600" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Registration Deadline</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal bg-gray-700 border-gray-600",
                                !registrationDeadline && "text-gray-400"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {registrationDeadline ? format(registrationDeadline, "PPP") : "Select deadline date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                            <Calendar
                              mode="single"
                              selected={registrationDeadline}
                              onSelect={setRegistrationDeadline}
                              initialFocus
                              className="bg-gray-700"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fee">Registration Fee</Label>
                        <div className="flex items-center space-x-2">
                          <Switch id="isFree" defaultChecked className="data-[state=checked]:bg-gold" />
                          <Label htmlFor="isFree">Free event</Label>
                        </div>
                      </div>
                      <Input id="fee" type="number" placeholder="0.00" disabled className="bg-gray-700 border-gray-600" />
                      <p className="text-sm text-gray-400">For paid events, you'll need to set up payment methods in the next step.</p>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Custom Registration Questions</Label>
                      <p className="text-sm text-gray-400 mb-2">Add questions you want participants to answer during registration.</p>
                      
                      {customQuestions.length > 0 && (
                        <div className="space-y-2 mb-4">
                          <p className="font-medium">Current Questions:</p>
                          <ul className="space-y-1 pl-5 list-disc">
                            {customQuestions.map((question, index) => (
                              <li key={index} className="text-gray-300">{question}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Enter a custom question..." 
                          value={newCustomQuestion}
                          onChange={(e) => setNewCustomQuestion(e.target.value)}
                          className="bg-gray-700 border-gray-600 flex-1"
                        />
                        <Button 
                          type="button" 
                          onClick={addCustomQuestion}
                          disabled={!newCustomQuestion.trim()}
                          className="bg-gold hover:bg-gold/90 text-gray-900"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="collectResumes" className="data-[state=checked]:bg-gold" />
                        <Label htmlFor="collectResumes">Collect Resumes/CVs from Participants</Label>
                      </div>
                      <p className="text-sm text-gray-400">Enable this if you want to collect resumes for recruitment purposes.</p>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button onClick={handleNext} className="bg-gold hover:bg-gold/90 text-gray-900">Next</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="teams" className="mt-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="enableTeams" defaultChecked className="data-[state=checked]:bg-gold" />
                        <Label htmlFor="enableTeams">Enable Team Formation</Label>
                      </div>
                      <p className="text-sm text-gray-400">Allow participants to form or join teams for your event.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="minTeamSize">Minimum Team Size</Label>
                        <Input id="minTeamSize" type="number" defaultValue="2" className="bg-gray-700 border-gray-600" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
                        <Input id="maxTeamSize" type="number" defaultValue="5" className="bg-gray-700 border-gray-600" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="teamMatching" className="data-[state=checked]:bg-gold" />
                        <Label htmlFor="teamMatching">Enable Smart Team Matching</Label>
                      </div>
                      <p className="text-sm text-gray-400">Help participants find team members based on skills, interests, and goals.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Team Formation Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-gray-700 border-gray-600",
                              !teamFormationDeadline && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {teamFormationDeadline ? format(teamFormationDeadline, "PPP") : "Select team formation deadline"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                          <Calendar
                            mode="single"
                            selected={teamFormationDeadline}
                            onSelect={setTeamFormationDeadline}
                            initialFocus
                            className="bg-gray-700"
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-sm text-gray-400">After this date, team formation will be locked.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="projectSubmissions" defaultChecked className="data-[state=checked]:bg-gold" />
                        <Label htmlFor="projectSubmissions">Enable Project Submissions</Label>
                      </div>
                      <p className="text-sm text-gray-400">Allow teams to submit their projects for review and judging.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Project Submission Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-gray-700 border-gray-600",
                              !projectSubmissionDeadline && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {projectSubmissionDeadline ? format(projectSubmissionDeadline, "PPP") : "Select submission deadline"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                          <Calendar
                            mode="single"
                            selected={projectSubmissionDeadline}
                            onSelect={setProjectSubmissionDeadline}
                            initialFocus
                            className="bg-gray-700"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="pt-4 flex justify-end space-x-2">
                      <Button 
                        variant="outline"
                        onClick={handleSaveAsDraft}
                        disabled={isUploading}
                        className="border-gold text-gold hover:bg-gold/10"
                      >
                        {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isUploading ? "Saving..." : "Save Draft"}
                      </Button>
                      <Button 
                        onClick={handlePublishEvent}
                        disabled={isUploading}
                        className="bg-gold hover:bg-gold/90 text-gray-900"
                      >
                        {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isUploading ? "Publishing..." : "Publish Event"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;
